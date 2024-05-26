import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import {
    IntegrationController,
} from "../../../Controllers";

class IntegrationRoute {
    private integrationController;
    router = Router();

    constructor() {
        this.integrationController = AppServiceProvider.getContainer().resolve(IntegrationController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/integrations",
            this.integrationController.getAllIntegration.bind(this.integrationController)
        );

        this.router.post(
            "/v1/integrations",
            this.integrationController.createIntegration.bind(this.integrationController)
        );
    };
};

export default new IntegrationRoute().router;