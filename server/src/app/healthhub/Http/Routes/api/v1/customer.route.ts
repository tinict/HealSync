import 'reflect-metadata';
import { Router } from "express";
import { CustomerController } from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class Customer {
    private customerController: CustomerController;
    router = Router();

    constructor() {
        this.customerController = AppServiceProvider.getContainer().resolve(CustomerController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/customer/me/:customer_id", 
            this.customerController.me.bind(this.customerController)
        );
        this.router.put(
            "/v1/customer/me", 
            this.customerController.updateCustomer.bind(this.customerController)
        );
        this.router.get(
            "/v1/customers", 
            this.customerController.allCustomer.bind(this.customerController)
        );
    };
};

export default new Customer().router;