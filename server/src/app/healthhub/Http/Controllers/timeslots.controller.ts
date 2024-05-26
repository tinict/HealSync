import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import { TimeSlotService } from '../../Services';
import { TYPES } from '../../Database/types';

@injectable()
export class TimeSlotController {
    constructor(
        @inject(TYPES.TimeSlotService)
        private timeSlotService: TimeSlotService
    ) { };

    async getTimeSlotBySchedule(req: Request, res: Response) {
        try {
            const timeSlots = await this.timeSlotService.getTimeSlotBySchedule(req.query);
            console.log(timeSlots);
            res.status(200).json(timeSlots);
        } catch (error: any) {
            throw error;
        }
    };

    async getTimeSlotByTime(req: Request, res: Response) {
        const timeSlots = await this.timeSlotService.findByPeroid(req.query);
        console.log(timeSlots);
        res.status(200).json(timeSlots);
    };

    async getTimeSlotByTypeSchedule(req: Request, res: Response) {
        try {
            const timeSlots = await this.timeSlotService.findByScheduleType(req.query);
            console.log(timeSlots);
            res.status(200).json(timeSlots);
        } catch (error: any) {
            throw error;
        }
    };

    async deleteTimeSlot(req: Request, res: Response) {
        try {
            await this.timeSlotService.removeTimeSlot(Number(req.params.timeslot_id));
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    async updateTimeSlot(req: Request, res: Response) {
        try {
            await this.timeSlotService.updateTimeSlot(
                {
                    timeslot_id: Number(req.params.timeslot_id),
                    ...req.body
                }
            );
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };
};
