import 'reflect-metadata';
import { inject, injectable } from "inversify";
import {
    InvoiceEntity,
    InvoiceEntity as InvoiceRepository,
    TransactionEntity,
    TransactionEntity as TransactionRepository
} from '../Entities';
import { TYPES } from '../Database/types';
import { StepStatus } from '../Constants/step-status.constant';
import { TransactionStatus, vnp_ResponseCode } from '../Constants';
import PublishMessage from '../Synchronized/Publishers/PublishMessage';

@injectable()
export class PaymentService {

    constructor() { }

    async PayInvoice(invoiceModel: any) {
        try {
            const invoiceEntity = new InvoiceEntity();
            const transactionEntity = new TransactionEntity();
            const createDate = await this.convertVNPayDate(invoiceModel.vnp_CreateDate);

            transactionEntity.user_id = invoiceModel.user_id;
            transactionEntity.transaction_date = createDate;
            transactionEntity.description = invoiceModel.vnp_OrderInfo
            
            await TransactionRepository.save(transactionEntity);

            invoiceEntity.amount = invoiceModel.vnp_Amount;
            invoiceEntity.invoice_code = invoiceModel.vnp_TxnRef;
            invoiceEntity.invoice_date = createDate;
            invoiceEntity.transactionEntity = transactionEntity;

            await InvoiceRepository.save(invoiceEntity);
        } catch (error) {
            console.log(error);
        }
    };

    async UpdatePayment(VNPayUpdateModel: any) {
        try {
            const invoice = await InvoiceRepository.findOne({
                where: { invoice_code: VNPayUpdateModel.vnp_TxnRef },
                relations: ["transactionEntity"]
            });
            if (!invoice) return;

            invoice.message_log = await this.convertMessageLog(VNPayUpdateModel.vnp_ResponseCode) ?? '';
            invoice.status = await this.convertStatusPayment(VNPayUpdateModel.vnp_ResponseCode);
            invoice.due_date = await this.convertVNPayDate(VNPayUpdateModel.vnp_PayDate);
            console.log(invoice.transactionEntity);

            await InvoiceRepository.save(invoice);

            const transaction = await TransactionRepository.findOne({ where: { transaction_id: invoice.transactionEntity.transaction_id } });
            if (!transaction) return;

            transaction.card_type = VNPayUpdateModel.vnp_CardType;
            transaction.transaction_status = await this.convertTransactionStatus(VNPayUpdateModel.vnp_TransactionStatus);
            transaction.transaction_code = VNPayUpdateModel.vnp_TransactionNo;

            await TransactionRepository.save(transaction);

            PublishMessage('ResultInvoice', {
                invoice_id: invoice.invoice_code, 
                status: await this.convertStatusPayment(VNPayUpdateModel.vnp_ResponseCode),
                due_at: await this.convertVNPayDate(VNPayUpdateModel.vnp_PayDate)
            });
        } catch (error: any) {
            throw error;
        }
    }

    async convertTransactionStatus(transactionCode: string) {
        let status: string;

        switch (transactionCode) {
            case "02":
                status = TransactionStatus["2"];
                break;
            case "03":
                status = TransactionStatus["3"];
                break;
            case "04":
                status = TransactionStatus["4"];
                break;
            case "05":
                status = TransactionStatus["5"];
                break;
            case "06":
                status = TransactionStatus["6"];
                break;
            case "08":
                status = TransactionStatus["8"];
                break;
            case "09":
                status = TransactionStatus["9"];
                break;
            case "16":
                status = TransactionStatus["16"];
                break;
            default:
                status = "Unknown transaction code";
        }

        return status;
    };

    async convertStatusPayment(resCode: string) {
        let status: string;

        switch (resCode) {
            case "00":
            case "07":
                status = StepStatus["2"];
                break;
            case "09":
            case "10":
            case "11":
            case "12":
            case "13":
            case "24":
            case "51":
            case "65":
            case "75":
            case "79":
                status = StepStatus["1"];
                break;
            default:
                status = StepStatus["0"];
        }

        return status;
    };

    async convertMessageLog(status_code: string) {
        let message: string;

        switch (status_code) {
            case "00":
                message = vnp_ResponseCode["00"];
                break;
            case "07":
                message = vnp_ResponseCode["07"];
                break;
            case "09":
                message = vnp_ResponseCode["09"];
                break;
            case "10":
                message = vnp_ResponseCode["10"];
                break;
            case "11":
                message = vnp_ResponseCode["11"];
                break;
            case "12":
                message = vnp_ResponseCode["12"];
                break;
            case "13":
                message = vnp_ResponseCode["13"];
                break;
            case "24":
                message = vnp_ResponseCode["24"];
                break;
            case "51":
                message = vnp_ResponseCode["51"];
                break;
            case "65":
                message = vnp_ResponseCode["65"];
                break;
            case "75":
                message = vnp_ResponseCode["75"];
                break;
            case "79":
                message = vnp_ResponseCode["79"];
                break;
            default:
                message = "Unknown status code";
        }

        return message;
    };

    async convertVNPayDate(vnp_CreateDate: string): Promise<Date> {
        const formattedDate = `${vnp_CreateDate.slice(0, 4)}-${vnp_CreateDate.slice(4, 6)}-${vnp_CreateDate.slice(6, 8)}T${vnp_CreateDate.slice(8, 10)}:${vnp_CreateDate.slice(10, 12)}:${vnp_CreateDate.slice(12, 14)}`;
        return new Date(formattedDate);
    };
};
