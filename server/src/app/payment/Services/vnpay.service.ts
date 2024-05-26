import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';
import vnpay from "../Constants/vnpay";
import {
    InpOrderAlreadyConfirmed,
    IpnFailChecksum,
    IpnInvalidAmount,
    IpnOrderNotFound,
    IpnResponse,
    IpnSuccess,
    IpnUnknownError,
    ReturnQueryFromVNPay,
    VNPay,
    VerifyReturnUrl
} from 'vnpay';
import { VNPayPayModel } from '../Models';
import { PaymentService } from './payments.service';
import { TYPES } from '../Database/types';
import { vnp_ResponseCode } from '../Constants';
import PublishMessage from '../Synchronized/Publishers/PublishMessage';
import { CreateInvoiceMapper } from '../Mappers';

@injectable()
export class VNPayService {
    private paymentService: PaymentService;

    constructor(
        @inject(TYPES.PaymentService)
        paymentService: PaymentService,
    ) {
        this.paymentService = paymentService;
    }

    async CreatePayment(invoiceModel: any) {
        try {
            const amount = invoiceModel.vnp_Amount;
            const ipAddr = invoiceModel.vnp_IpAddr;
            const txnRef = uuidv4();
            const orderInfo = txnRef;

            const urlString = await vnpay.buildPaymentUrl({
                vnp_Amount: amount,
                vnp_IpAddr: ipAddr,
                vnp_TxnRef: txnRef,
                vnp_OrderInfo: orderInfo,
                vnp_OrderType: 'other',
                vnp_ReturnUrl: `http://localhost:5007/api/v1/vnpay-return`,
            });

            const params = await this.getQueryParams(urlString);
            console.log(params);
            const payModel = VNPayPayModel.toVNPayPay({ ...params, ...invoiceModel });
            await this.paymentService.PayInvoice(payModel);

            const createInvoiceMapper = {
                invoice_id: txnRef,
                customer_id: invoiceModel.user_id,
                appointment_id: invoiceModel.appointment_id,
                status: 'Processing',
                create_at: await this.convertVNPayDate(payModel.vnp_CreateDate),
            };
            
            PublishMessage('CreateInvoice', createInvoiceMapper);
            
            return urlString;
        } catch (error) {
            console.log(error);
        }
    };

    async convertVNPayDate(vnp_CreateDate: string): Promise<Date> {
        const formattedDate = `${vnp_CreateDate.slice(0, 4)}-${vnp_CreateDate.slice(4, 6)}-${vnp_CreateDate.slice(6, 8)}T${vnp_CreateDate.slice(8, 10)}:${vnp_CreateDate.slice(10, 12)}:${vnp_CreateDate.slice(12, 14)}`;
        return new Date(formattedDate);
    };

    async getQueryParams(url: string) {
        const urlObj = new URL(url);
        const queryString = urlObj.search;
        const params = new URLSearchParams(queryString);
        const paramsObj: { [key: string]: string } = {};
        for (const [key, value] of params.entries()) {
            paramsObj[key] = value;
        }
        return paramsObj;
    }

    async ReturnPayment(query: any) {
        try {
            let verify: VerifyReturnUrl;
            try {
                verify = await vnpay.verifyReturnUrl(query);
                console.log(verify.vnp_OrderInfo);
                if (!verify.isVerified) {
                    // return res.status(200).json({
                    //     message: verify?.message ?? 'Payment failed!',
                    //     status: verify.isSuccess,
                    // });
                    const message1 = {
                        message: verify?.message ?? 'Payment failed!',
                        status: verify.isSuccess,
                    };
                    return `http://localhost:3003/appointment/payment?message=${message1}&invoice_id=${verify.vnp_OrderInfo}`;
                }
            } catch (error: any) {
                console.log(`verify error: ${error}`);
                // return res.status(400).json({ message: 'verify error', status: false });
                const message2 = { message: 'verify error', status: false };
                return `http://localhost:3003/appointment/payment?message=${message2}`;
            }

            // res.redirect('http://localhost:3000/doctors/appointment/payment?message="Payment successful!"');
            // return res.status(200).json({
            //     message: verify?.message ?? 'Payment successful!',
            //     status: verify.isSuccess,
            // });
            // const message3 = {
            //     message: verify?.message ?? 'Payment successful!',
            //     status: verify.isSuccess,
            // }
            return `http://localhost:3003/appointment/payment?message=${verify?.message}&status=${verify.isSuccess}&invoice_id=${verify.vnp_OrderInfo}`;
        } catch (error) {
            console.log(error);
        }
    }

    async IPN(query: any) {
        try {
            const verify: VerifyReturnUrl = await vnpay.verifyIpnCall(query);
            console.log(verify.vnp_OrderInfo);
            if (!verify.isVerified) {
                // return res.json(IpnFailChecksum);
                return `http://localhost:3003/appointment/payment?message=${IpnFailChecksum}&invoice_id=${verify.vnp_OrderInfo}`;
            }

            // Find the order in your database
            // This is the sample order that you need to check the status, amount, etc.
            const foundOrder = {
                orderId: '123456',
                amount: 10000,
                status: 'pending',
            };

            // If the order is not found, or the order id is not matched
            // You can use the orderId to find the order in your database
            if (!foundOrder || verify.vnp_TxnRef !== foundOrder.orderId) {
                // return res.json(IpnOrderNotFound);
                return `http://localhost:3003/appointment/payment?message=${IpnOrderNotFound}&invoice_id=${verify.vnp_OrderInfo}`;
            }

            // If the amount is not matched
            if (verify.vnp_Amount !== foundOrder.amount) {
                // return res.json(IpnInvalidAmount);
                return `http://localhost:3003/appointment/payment?message=${IpnInvalidAmount}&invoice_id=${verify.vnp_OrderInfo}`;
            }

            // If the order is already confirmed
            if (foundOrder.status === 'completed') {
                // return res.json(InpOrderAlreadyConfirmed);
                return `http://localhost:3003/appointment/payment?message=${InpOrderAlreadyConfirmed}&invoice_id=${verify.vnp_OrderInfo}`;
            }

            // Update the order status to completed
            // Eg: Update the order status in your database
            foundOrder.status = 'completed';

            // Then return the success response to VNPay
            // return res.json(IpnSuccess);
            return `http://localhost:3003/appointment/payment?message=${IpnSuccess}&invoice_id=${verify.vnp_OrderInfo}`;
        } catch (error) {
            console.log(`verify error: ${error}`);
            // return res.json(IpnUnknownError);
            return `http://localhost:3003/appointment/payment?message=${IpnUnknownError}`;
        }
    }
};
