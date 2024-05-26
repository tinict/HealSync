import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import {
    ModelController,
} from "../../../Controllers";

class ModelRoute {
    private modelController;
    router = Router();

    constructor() {
        this.modelController = AppServiceProvider.getContainer().resolve(ModelController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/models",
            this.modelController.createModel.bind(this.modelController)
        );

        this.router.get(
            "/v1/models",
            this.modelController.getAllModel.bind(this.modelController)
        );
    };
};

export default new ModelRoute().router;
