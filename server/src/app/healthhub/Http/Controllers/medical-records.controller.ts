import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import {
    MedicalRecordService
} from "../../Services";
import {
    MedicalRecordMapper
} from "../../Mappers";
import { TYPES } from "../../Database/types";

@injectable()
export class MedicalRecordController {
    constructor(
        @inject(TYPES.MedicalRecordService)
        private medicalRecordService: MedicalRecordService,
    ) { }

    async createMedicalRecord(req: Request, res: Response) {
        try {
            const medicalRecord = await this.medicalRecordService.CreateRecord(MedicalRecordMapper.toMedicalRecord(req.body));
            return res.status(200).json(medicalRecord);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    }

    async getMedicalRecord(req: Request, res: Response) {
        try {
            const customer_id = req.params._id;
            const medicalRecords = await this.medicalRecordService.getListMedicalRecord(customer_id);
            return res.status(200).json(medicalRecords);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }

    async getMedicalRecordForCustomer(req: Request, res: Response) {
        try {
            const { customer_id, appointment_id } = req.query;
            console.log(customer_id, appointment_id);
            const medicalRecords = await this.medicalRecordService.getMedicalRecordForCustomer(customer_id, appointment_id);
            return res.status(200).json(medicalRecords);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
};
