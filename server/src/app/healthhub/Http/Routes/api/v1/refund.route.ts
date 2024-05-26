import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { RefundController } from '../../../Controllers/refunds.controller';

class RefundRoute {
    private refundController: RefundController;
    router = Router();

    constructor() {
        this.refundController = AppServiceProvider.getContainer().resolve(RefundController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/refunds", 
            this.refundController.createRefund.bind(this.refundController)
        );

        this.router.get(
            "/v1/refunds/:customer_id", 
            this.refundController.getRefunds.bind(this.refundController)
        );

        this.router.put(
            "/v1/refunds", 
            this.refundController.updatedRefund.bind(this.refundController)
        );

        this.router.get(
            "/v1/refund-all",
            this.refundController.getAllRefund.bind(this.refundController)
        );
    };
};

export default new RefundRoute().router;
