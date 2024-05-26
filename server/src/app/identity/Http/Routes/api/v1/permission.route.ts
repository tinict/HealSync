import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import {
    PermissionController,
} from "../../../Controllers";

class PermissionRoute {
    private permissionController;
    router = Router();

    constructor() {
        this.permissionController = AppServiceProvider.getContainer().resolve(PermissionController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/permissions",
            this.permissionController.getAllModel.bind(this.permissionController)
        );

        this.router.post(
            "/v1/permissions",
            this.permissionController.createPermission.bind(this.permissionController)
        );
    };
};

export default new PermissionRoute().router;
