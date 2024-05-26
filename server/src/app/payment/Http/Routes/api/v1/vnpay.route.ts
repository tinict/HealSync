import { Router } from "express";
import { VNPayMiddleware } from './../../../Middlewares/vnpay.middleware';
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { VNPayController } from "../../../Controllers";

class VNPayRoute {
    router = Router();
    private vnPayController: VNPayController;
    private vnPayMiddleware: VNPayMiddleware;

    constructor() {
        this.vnPayController = AppServiceProvider.getContainer().resolve(VNPayController);
        this.vnPayMiddleware = AppServiceProvider.getContainer().resolve(VNPayMiddleware);
        this.intializeRoutes();
    }

    intializeRoutes() {
        const payment = this.vnPayController.CreatePayment.bind(this.vnPayController);
        const ipn = this.vnPayController.IPN.bind(this.vnPayController);
        const vnpayreturn = this.vnPayController.ReturnPayment.bind(this.vnPayController);
        const vnpayMiddleware = this.vnPayMiddleware.ResultPayMidde.bind(this.vnPayMiddleware);

        this.router.get(
            "/v1/vnpay",
            payment
        );

        this.router.get(
            "/v1/vnpay-ipn", 
            ipn
        );

        this.router.get(
            "/v1/vnpay-return", 
            vnpayMiddleware,
            vnpayreturn,
        );

        this.router.get(
            "/v1/payment", 
            () => {}
        ) 
    }
};

export default new VNPayRoute().router;