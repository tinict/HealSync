import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    AccountController,
    ModelPermissionController,
} from "../../../Controllers";

class ModelPermissionRoute {
    private modelPermissionController;
    router = Router();

    constructor() {
        this.modelPermissionController = AppServiceProvider.getContainer().resolve(ModelPermissionController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/model-permissions",
            this.modelPermissionController.createModelPermission.bind(this.modelPermissionController)
        );

        this.router.get(
            "/v1/model-permissions/:model_id",
            this.modelPermissionController.getModelPermission.bind(this.modelPermissionController)
        );

        this.router.get(
            "/v1/model-permission-integrations",
            this.modelPermissionController.getAllModelPermissionIntegration.bind(this.modelPermissionController)
        );
    };
};

export default new ModelPermissionRoute().router;
