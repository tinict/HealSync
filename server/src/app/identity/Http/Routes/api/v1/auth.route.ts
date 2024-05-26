import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    AuthenticationController, 
} from "../../../Controllers/authentication.controller";
import {
    AuthenticationMiddleware,
    IdentifyMiddleware 
} from "../../../Middlewares";
import passport from 'passport';

class AuthRoute {
    private authenticationController: AuthenticationController;
    private authenticationMiddleware: AuthenticationMiddleware;
    private identifyMiddleware: IdentifyMiddleware;
    router = Router();

    constructor() {
        this.authenticationController = AppServiceProvider.getContainer().resolve(AuthenticationController);
        this.authenticationMiddleware = AppServiceProvider.getContainer().resolve(AuthenticationMiddleware);
        this.identifyMiddleware = AppServiceProvider.getContainer().resolve(IdentifyMiddleware);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.authenticationMiddleware.configurePassport();

        this.router.post(
            "/v1/auth/login", 
            passport.authenticate('local', { session: false }), 
            this.authenticationController.login.bind(this.authenticationController)
        );

        this.router.post(
            '/v1/auth/register',
            this.authenticationController.register.bind(this.authenticationController)
        );

        this.router.get(
            '/v1/auth/me',
            passport.authenticate('jwt', { session: false }),
            this.authenticationController.me.bind(this.authenticationController)
        );

        this.router.post(
            '/v1/auth/revoke',
            passport.authenticate('jwt', { session: false }),
            this.authenticationController.revokeToken.bind(this.authenticationController)
        );

        this.router.get(
            '/v1/identify/otp',
            this.authenticationController.createOTP.bind(this.authenticationController)
        );

        this.router.post(
            '/v1/auth/reset-password',
            this.identifyMiddleware.identifyAccount.bind(this.identifyMiddleware),
            this.authenticationController.resetPassword.bind(this.authenticationController)
        );
    };
};
export default new AuthRoute().router;
