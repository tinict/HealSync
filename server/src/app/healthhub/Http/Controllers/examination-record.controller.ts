import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { 
    AppointmentService, 
    ExaminationRecordService 
} from "../../Services";
import { TYPES } from "../../Database/types";

@injectable()
export class ExaminationRecordController {
    constructor(
        @inject(TYPES.ExaminationRecordService)
        private examinationRecordService: ExaminationRecordService,
    ) { };

    async getExaminationRecord(req: Request, res: Response) {
        try {
            const customer_id = req.params.customer_id;
            const examinationRecord = await this.examinationRecordService.getExaminationRecord(customer_id);
            return res.status(200).json(examinationRecord);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getPatientByDoctor(req: Request, res: Response) {
        try {
            const doctor_id = req.params.doctor_id;
            const patients = await this.examinationRecordService.getPatientByDoctor(doctor_id);
            return res.status(200).json(patients);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async examinationExistTimeslot(req: Request, res: Response) {
        try {
            const  { timeslot_id } = req.params;
            const examinationRecords = await this.examinationRecordService.examinationExistTimeslot(Number(timeslot_id));
            return res.status(200).json(examinationRecords);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getPatientAll(req: Request, res: Response) {
        try {
            const patients = await this.examinationRecordService.getPatientAll();
            return res.status(200).json(patients);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };
};
