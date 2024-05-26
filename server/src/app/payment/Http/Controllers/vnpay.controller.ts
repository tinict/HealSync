import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import {
    IpnResponse,
    ReturnQueryFromVNPay,
} from 'vnpay';
import {
    VNPayService
} from '../../Services';
import { TYPES } from '../../Database/types';
import { PayInvoiceMapper } from '../../Mappers';

@injectable()
class VNPayController {
    constructor(
        @inject(TYPES.VNPayService)
        private vnpayService: VNPayService
    ) { };

    async CreatePayment(req: Request, res: Response) {
        try {
            const payInvoiceModel = PayInvoiceMapper.toPayInvoice(req.query);
            console.log(payInvoiceModel);
            const vnp_url: string = await this.vnpayService.CreatePayment(payInvoiceModel) as string;
            return res.status(200).json({ url: vnp_url });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    async ReturnPayment(req: Request, res: Response) {
        try {
            const url: string = await this.vnpayService.ReturnPayment(req.query) as string;
            return res.redirect(url);
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    async IPN(req: Request<any, any, any, ReturnQueryFromVNPay>, res: Response<IpnResponse>) {
        try {
            const ipnResponse: IpnResponse = await this.vnpayService.IPN(req.query) as unknown as IpnResponse;
            return res.status(200).json(ipnResponse);
        } catch (error: any) {
            console.log(error);
        }
    };
};

export { VNPayController };