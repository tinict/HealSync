import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import { DoctorService } from '../../Services';
import { TYPES } from '../../Database/types';
import {
    DoctorEntity as DoctorRepository
} from '../../Entities/doctors.entity';

@injectable()
export class DoctorController {
    constructor(
        @inject(TYPES.DoctorService)
        private doctorService: DoctorService
    ) { };

    async getAll(req: Request, res: Response) {
        const doctors = await DoctorRepository.find();
        res.status(200).json(doctors);
    };

    async getDoctorByTime(req: Request, res: Response) {
        try {
            const dateSelected = req.params.datework;
            const typeSchedule = req.query.typeSchedule;

            if (!dateSelected || typeof dateSelected !== 'string') {
                throw new Error('Invalid datework parameter');
            }
            const doctors = await this.doctorService.findAllDoctorByTime(dateSelected, typeSchedule);
            res.status(200).json(doctors);
        } catch (error) {
            return res.status(500).send("Server Error");
        }
    };

    async getDoctorById (req: Request, res: Response) {
        try {
            const profileDoctor = await this.doctorService.getDoctorById(req.params.id);
            return res.status(200).json(profileDoctor);
        } catch (error) {
            return res.status(500).send("Server Error");
        }
    };

    async updateBioDoctor (req: Request, res: Response) {
        try {
            const doctorModel = req.body;
            const profileDoctor = await this.doctorService.updateInformationDoctor(doctorModel);
            return res.status(200).json(profileDoctor);
        } catch (error) {
            return res.status(500).send("Server Error");
        }
    };

    async updateProfileDoctor (req: Request, res: Response) {
        try {
            const doctorModel = req.body;
            const profileDoctor = await this.doctorService.updateProfileDoctor(doctorModel);
            return res.status(200).json(profileDoctor);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };
};
