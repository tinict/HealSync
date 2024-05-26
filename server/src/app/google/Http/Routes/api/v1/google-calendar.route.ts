import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { AuthMiddleware } from "../../../Middlewares";
import { 
    GoogleCalendarController 
} from "../../../Controllers";

class GoogleCalendarRoute {
    private googleCalendarController: GoogleCalendarController;
    private authMiddleware: AuthMiddleware;
    router = Router();

    constructor() {
        this.googleCalendarController = AppServiceProvider.getContainer().resolve(GoogleCalendarController);
        this.authMiddleware = AppServiceProvider.getContainer().resolve(AuthMiddleware);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post (
            "/v1/google/service/calendar/event",
            this.googleCalendarController.createEvent.bind(this.googleCalendarController)
        );
    }
};

export default new GoogleCalendarRoute().router;
