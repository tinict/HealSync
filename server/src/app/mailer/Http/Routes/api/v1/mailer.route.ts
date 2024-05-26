import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { MailerController } from "../../../Controllers/mailer.controller";

class MailerRoute {
    private mailerController: MailerController;
    router = Router();

    constructor() {
        this.mailerController = AppServiceProvider.getContainer().resolve(MailerController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/mailer/sendmail",
            this.mailerController.sendmail.bind(this.mailerController),
        );

        this.router.post(
            "/v1/mailer/sendmail/list",
            this.mailerController.sendmailList.bind(this.mailerController),
        );
    };
};

export default new MailerRoute().router;