import 'reflect-metadata';
import { Router } from "express";
import { 
    FeedbackController 
} from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class FeedbackRoute {
    private feedbackController: FeedbackController;
    router = Router();

    constructor() {
        this.feedbackController = AppServiceProvider.getContainer().resolve(FeedbackController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/send-feedbacks", 
            this.feedbackController.sendFeedback.bind(this.feedbackController)
        );
        this.router.get(
            "/v1/feedbacks/:doctor_id", 
            this.feedbackController.feedbacks.bind(this.feedbackController)
        );
        this.router.get(
            "/v1/reply-feedbacks/:doctor_id", 
            this.feedbackController.replyFeedbacks.bind(this.feedbackController)
        );
    };
};

export default new FeedbackRoute().router;