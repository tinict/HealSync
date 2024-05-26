import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    GoogleAccountController 
} from "../../../Controllers";
import { AuthMiddleware } from "../../../Middlewares";

class GoogleAccountRoute {
    private googleAccountController: GoogleAccountController;
    private authMiddleware: AuthMiddleware;
    router = Router();

    constructor() {
        this.googleAccountController = AppServiceProvider.getContainer().resolve(GoogleAccountController);
        this.authMiddleware = AppServiceProvider.getContainer().resolve(AuthMiddleware);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/v1/google/account/me/", 
        this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
        this.googleAccountController.me.bind(this.googleAccountController));
    }
};

export default new GoogleAccountRoute().router;
