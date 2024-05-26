import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { 
    InvoiceService,
} from "../../Services";
import { TYPES } from "../../Database/types";

@injectable()
export class InvoiceController {
    constructor(
        @inject(TYPES.InvoiceService)
        private invoiceService: InvoiceService,
    ) { };

    async getInvoices(req: Request, res: Response) {
        try {
            const customer_id = req.params.customer_id;
            const invoices = await this.invoiceService.getInvoices(customer_id);
            res.status(200).json(invoices);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getInvoiceByAppointment(req: Request, res: Response) {
        try {
            const appointment_id = req.params.appointment_id;
            const invoice = await this.invoiceService.getInvoiceByAppointment(appointment_id);
            res.status(200).json(invoice);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async updateInvoice(req: Request, res: Response) {
        try {
            const { invoice_id, appointment_id } = req.body;
            const invoice = await this.invoiceService.updateInvoice(invoice_id, appointment_id);
            res.status(200).json(invoice);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };
};
