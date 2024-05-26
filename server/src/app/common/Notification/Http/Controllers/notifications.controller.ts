import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../Database/types";
import { 
    NotificationService 
} from "../../Services";
import { NotificationMapper } from "../../Mappers";

@injectable()
export class NotificationController {
    constructor(
        @inject(TYPES.NotificationService)
        private notificationService: NotificationService
    ) { };

    async createNotification(req: Request, res: Response) {
        try {
            const notiModel = NotificationMapper.toNotification(req.body);
            const notification = await this.notificationService.createNotification(notiModel);
            res.status(200).json(notification);
        } catch (err: any) {
            return res.status(500).json(err.message);
        }
    };

    async updateNotification(req: Request, res: Response) {
        try {
            const notification_id = Number(req.params.notification_id);
            const notification = await this.notificationService.updateNotification(notification_id);
            res.status(200).json(notification);
        } catch (err: any) {
            return res.status(500).json(err.message);
        }
    };

    async getNotification(req: Request, res: Response) {
        try {
            const identity_id = req.params.identity_id;
            const listNotification = await this.notificationService.getNotification(identity_id);
            res.status(200).json(listNotification);
        } catch (err: any) {
            return res.status(500).json(err.message);
        }
    };

    async deleteNotification(req: Request, res: Response) {
        try {
            const notification_id = Number(req.params.notification_id);
            const listNotification = await this.notificationService.deleteNotification(notification_id);
            res.status(200).json(listNotification);
        } catch (err: any) {
            return res.status(500).json(err.message);
        }
    };
};
