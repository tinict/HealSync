import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    AccountController,
} from "../../../Controllers";

class Auth {
    private accountController;
    router = Router();

    constructor() {
        this.accountController = AppServiceProvider.getContainer().resolve(AccountController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/accounts",
            this.accountController.listAccount.bind(this.accountController)
        );
    };
};

export default new Auth().router;
