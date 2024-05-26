import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import {
    FeedbackService
} from '../../Services';
import { TYPES } from '../../Database/types';

@injectable()
export class FeedbackController {
    constructor(
        @inject(TYPES.FeedbackService)
        private feedbackService: FeedbackService
    ) { }

    async sendFeedback(req: Request, res: Response) {
        try {
            const feedbackModel = req.body;
            const feedback = await this.feedbackService.sendFeedback(feedbackModel);
            return res.status(200).json(feedback);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };

    async feedbacks(req: Request, res: Response) {
        try {
            const doctor_id = req.params.doctor_id;
            const feedbacks = await this.feedbackService.getFeedback(doctor_id);
            return res.status(200).json(feedbacks);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };

    async replyFeedbacks(req: Request, res: Response) {
        try {
            const doctor_id = req.params.doctor_id;
            const reply_id = req.query.reply_id;

            const relyFeedbacks = await this.feedbackService.getReplyFeedback(doctor_id, Number(reply_id));
            return res.status(200).json(relyFeedbacks);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };
};
