import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from '../../../../Providers/AppServiceProvider';
import {
    NotificationController 
} from '../../../Controllers';

class NotificationRoute {
    private notificationController: NotificationController;
    router = Router();

    constructor() {
        this.notificationController = AppServiceProvider.getContainer().resolve(NotificationController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(
            "/v1/notification", 
            this.notificationController.createNotification.bind(this.notificationController)
        );

        this.router.put(
            "/v1/notification/:notification_id", 
            this.notificationController.updateNotification.bind(this.notificationController)
        );

        this.router.get(
            "/v1/notification/:identity_id", 
            this.notificationController.getNotification.bind(this.notificationController)
        );

        this.router.delete(
            "/v1/notification/:notification_id", 
            this.notificationController.deleteNotification.bind(this.notificationController)
        );
    }
}

export default new NotificationRoute().router;