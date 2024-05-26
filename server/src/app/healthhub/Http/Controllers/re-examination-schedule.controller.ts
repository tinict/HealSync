import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { 
    AppointmentService, 
    ExaminationRecordService, 
    ReExaminationScheduleService
} from "../../Services";
import { TYPES } from "../../Database/types";

@injectable()
export class ReExaminationScheduleController {
    constructor(
        @inject(TYPES.ReExaminationScheduleService)
        private reExaminationScheduleService: ReExaminationScheduleService,
    ) { };

    async createReSchedule(req: Request, res: Response) {
        try {
            const reExaminationSchedule = await this.reExaminationScheduleService.createReSchedule(req.body);
            return res.status(200).json(reExaminationSchedule);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getReExaminationSchedule(req: Request, res: Response) {
        try {
            const getReExaminationSchedule = await this.reExaminationScheduleService.getReExaminationSchedule(req.query);
            return res.status(200).json(getReExaminationSchedule);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async updateReSchedule(req: Request, res: Response) {
        try {
            const updateReSchedule = await this.reExaminationScheduleService.updateReExaminationSchedule(req.body.appointment_id, req.body);
            return res.status(200).json(updateReSchedule);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getReExamination (req: Request, res: Response) {
        try {
            const getReExaminationSchedule = await this.reExaminationScheduleService.getReExamination(req.query);
            return res.status(200).json(getReExaminationSchedule);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };
};
