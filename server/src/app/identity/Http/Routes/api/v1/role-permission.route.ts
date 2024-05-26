import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    AccountController,
    RolePermissionController,
} from "../../../Controllers";

class RolePermissionRoute {
    private rolePermissionController;
    router = Router();

    constructor() {
        this.rolePermissionController = AppServiceProvider.getContainer().resolve(RolePermissionController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/role-permissions",
            this.rolePermissionController.getAllRolePermission.bind(this.rolePermissionController)
        );
    };
};

export default new RolePermissionRoute().router;
