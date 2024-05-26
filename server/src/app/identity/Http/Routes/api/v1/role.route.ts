import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { RoleController } from "../../../Controllers";

class RoleRoute {
    private roleController: RoleController;
    router = Router();

    constructor() {
        this.roleController = AppServiceProvider.getContainer().resolve(RoleController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/roles",
            this.roleController.createRole.bind(this.roleController)
        );

        this.router.post(
            "/v1/role",
            this.roleController.createRoles.bind(this.roleController)
        );

        this.router.get(
            "/v1/roles",
            this.roleController.getAllRole.bind(this.roleController)
        );
    };
};

export default new RoleRoute().router;
