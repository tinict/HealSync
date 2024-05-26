import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from '../../../../Providers/AppServiceProvider';
import { AccountController } from '../../../Controllers';

class AccountRoute {
    private accountController: AccountController;
    router = Router();

    constructor() {
        this.accountController = AppServiceProvider.getContainer().resolve(AccountController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(
            "/v1/notification/accounts", 
            this.accountController.createAccount.bind(this.accountController)
        );
    }
}

export default new AccountRoute().router;