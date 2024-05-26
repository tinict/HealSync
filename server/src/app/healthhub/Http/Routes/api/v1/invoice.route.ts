import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { InvoiceController } from "../../../Controllers";

class InvoiceRoute {
    private invoiceController: InvoiceController;
    router = Router();

    constructor() {
        this.invoiceController = AppServiceProvider.getContainer().resolve(InvoiceController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/invoices/:customer_id", 
            this.invoiceController.getInvoices.bind(this.invoiceController)
        );
        this.router.get(
            "/v1/invoice/:appointment_id", 
            this.invoiceController.getInvoiceByAppointment.bind(this.invoiceController)
        );
        this.router.put(
            "/v1/invoices", 
            this.invoiceController.updateInvoice.bind(this.invoiceController)
        );
    };
};

export default new InvoiceRoute().router;
