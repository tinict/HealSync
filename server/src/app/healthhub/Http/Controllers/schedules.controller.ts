import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import { ScheduleService, TimeSlotService } from '../../Services';
import { ScheduleMapper, ScheduleQueryMapper } from '../../Mappers';
import { TYPES } from '../../Database/types';

@injectable()
export class ScheduleController {
    constructor(
        @inject(TYPES.ScheduleService)
        private scheduleService: ScheduleService
    ) { }

    async get(req: Request, res: Response) {

        res.status(200).json();
    }

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            let scheduleCreate = ScheduleMapper.toScheduleMapper(req.body);
            console.log(scheduleCreate.datework);
            const schedule = await this.scheduleService.create(scheduleCreate);
            console.log(schedule);
            return res.status(200).json({ 'scheduleCreate': schedule });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    async update(req: Request, res: Response) {
        try {
            const scheduleQueryModel = ScheduleQueryMapper.toScheduleQueryMapper(req.query);
            const schedule_id = Number(req.params.schedule_id);
            await this.scheduleService.update(schedule_id, scheduleQueryModel);
            return res.status(200).json(scheduleQueryModel);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async delete(req: Request, res: Response) {
        const schedule_id = req.params.schedule_id;
        await this.scheduleService.remove(Number(schedule_id));
        res.status(200).json(req.params.schedule_id);
    }

    async getSchedules (req: Request, res: Response) {
        try {
            const schedules = await this.scheduleService.getSchedules(req.params.doctor_id);
            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}