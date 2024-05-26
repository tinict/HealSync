import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    ProfileController,
} from "../../../Controllers";

class ProfileRoute {
    private profileController;
    router = Router();

    constructor() {
        this.profileController = AppServiceProvider.getContainer().resolve(ProfileController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/account/profiles",
            this.profileController.listProfile.bind(this.profileController)
        );

        this.router.get(
            "/v1/identify/profile",
            this.profileController.identifyProfile.bind(this.profileController)
        );
    };
};

export default new ProfileRoute().router;
