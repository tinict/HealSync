import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { MessageController } from "../../../Controllers";

export class MessageRoute {
    router = Router();
    private messageController;

    constructor() {
        this.messageController = AppServiceProvider.getContainer().resolve(MessageController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/v1/messages/:thread_id", this.messageController.getMessagesInThread());
        this.router.post("/v1/message/:thread_id", this.messageController.createMeasageInThread());
    }
}

export default new MessageRoute().router;
