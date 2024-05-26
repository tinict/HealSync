import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { ThreadController } from "../../../Controllers";

export class ThreadRoute {
    router = Router();
    private threadController;

    constructor() {
        this.threadController = AppServiceProvider.getContainer().resolve(ThreadController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get(
            "/v1/threads", 
            this.threadController.getThreads()
        );
        this.router.post(
            "/v1/thread", 
            this.threadController.createThreads()
        );
        this.router.delete(
            "/v1/threads/:thread_id", 
            this.threadController.deleteThreads()
        );
    }
};

export default new ThreadRoute().router;
