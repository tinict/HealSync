import 'reflect-metadata';
import {
    injectable,
} from "inversify";
import { v4 as uuidv4 } from 'uuid';
import {
    FeedbackEntity as FeedbackRepository,
    FeedbackEntity,
    DoctorEntity,
    DoctorEntity as DoctorRepository,
    CustomerEntity,
    CustomerEntity as CustomerRepository
} from '../Entities';

@injectable()
export class FeedbackService {
    construct() { };

    async sendFeedback(feedbackModel: any) {
        try {
            const feedback = new FeedbackEntity();

            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: feedbackModel.doctor_id } });
            if (!doctorEntity) return;

            const customerEntity = await CustomerRepository.findOne({ where: { customer_id: feedbackModel.customer_id } });
            if (!customerEntity) return;

            feedback.content_feedback = feedbackModel.content_feedback;
            feedback.doctorEntity = doctorEntity;
            feedback.customerEntity = customerEntity;
            if (feedbackModel.parent_feedback_id !== null)
                feedback.parent_feedback_id = feedbackModel.parent_feedback_id;

            return await FeedbackRepository.save(feedback);
        } catch (error: any) {
            throw error;
        }
    };

    async getFeedback(doctor_id: string) {
        try {
            const feedbacks = await FeedbackRepository
                .createQueryBuilder("tbl_feedbacks")
                .leftJoinAndSelect("tbl_feedbacks.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_feedbacks.doctorEntity", "tbl_doctors")
                .where("tbl_doctors.doctor_id = :doctor_id", { doctor_id })
                .getMany();

            return feedbacks;
        } catch (error: any) {
            throw error;
        }
    };

    async getReplyFeedback(doctor_id: string, feedback_id: number) {
        try {
            const feedbacks = await FeedbackRepository
                .createQueryBuilder("tbl_feedbacks")
                .leftJoinAndSelect("tbl_feedbacks.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_feedbacks.doctorEntity", "tbl_doctors")
                .where("tbl_doctors.doctor_id = :doctor_id and tbl_feedbacks.parent_feedback_id = :feedback_id",
                    { 
                        doctor_id, 
                        feedback_id 
                    }
                )
                .getMany();

            return feedbacks;
        } catch (error: any) {
            throw error;
        }
    };
};
