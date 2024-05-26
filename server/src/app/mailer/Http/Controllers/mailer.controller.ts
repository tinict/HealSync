import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../Database/types";
import { MailerService } from "../../Services";
import { SendMailModel } from "../../Models";

@injectable()
export class MailerController {
    constructor(
        @inject(TYPES.MailerService)
        private mailerService: MailerService,
    ) { };

    async sendmail(req: Request, res: Response) {
        try {
            const mailermodel = SendMailModel.toSendMail(req.body);
            console.log(mailermodel);
            await this.mailerService.sendMail(req.body);
            
            res.status(200).json("Send email successfully");
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async sendmailList(req: Request, res: Response) {
        try {
            const { listData } = req.body;
            await this.mailerService.sendMailerDataList(listData);
            res.status(200).json("Send email list successfully");
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };
};
