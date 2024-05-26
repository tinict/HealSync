import { Router } from "express";
import passport from "passport";
import { 
    AuthMiddleware, 
} from "../../../Middlewares";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { 
    AuthenticationGoogleController 
} from "../../../Controllers";

class AuthRoute {
    private authenticationGoogleController: AuthenticationGoogleController;
    private authMiddleware: AuthMiddleware;
    router = Router();

    constructor() {
        this.authenticationGoogleController = AppServiceProvider.getContainer().resolve(AuthenticationGoogleController);
        this.authMiddleware = AppServiceProvider.getContainer().resolve(AuthMiddleware);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get(
            '/v1/auth/google', 
            passport.authenticate('google', {
                scope: [
                    'profile', 
                    'email',
                    'https://www.googleapis.com/auth/calendar' 
                ],
                prompt: 'consent',
                session: false
            }),
            this.authenticationGoogleController.authenticationGoogle.bind(this.authenticationGoogleController)
        );

        this.router.get(
            '/v1/auth/google/callback', 
            function (req, res, next) {
                passport.authenticate('google', function (err: any, user: any, access_token: any) {
                    req.user = user;
                    req.accessToken = access_token;
                    console.log("act: " + access_token);
                    next();
                })(req, res, next);
            }, 
            this.authenticationGoogleController.authGoogle.bind(this.authenticationGoogleController)
        );

        this.router.get(
            '/v1/google/client_token', 
            this.authenticationGoogleController.responseTokenClient.bind(this.authenticationGoogleController)
        );

        this.router.post(
            '/v1/google/logout', 
            this.authenticationGoogleController.logOutGoogle.bind(this.authenticationGoogleController)
        );
    }
}
export default new AuthRoute().router;
