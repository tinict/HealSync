import 'reflect-metadata';
import { Router } from "express";
import { TimeSlotController } from "../../../Controllers";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";

class TimeSlot {
    private timeSlotController: TimeSlotController;
    router = Router();

    constructor() {
        this.timeSlotController = AppServiceProvider.getContainer().resolve(TimeSlotController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/timeslots", 
            this.timeSlotController.getTimeSlotBySchedule.bind(this.timeSlotController)
        );

        this.router.get(
            "/v1/timeslots/peroid", 
            this.timeSlotController.getTimeSlotByTime.bind(this.timeSlotController)
        );

        this.router.get(
            "/v1/timeslots/schedule-type", 
            this.timeSlotController.getTimeSlotByTypeSchedule.bind(this.timeSlotController)
        );

        this.router.delete(
            "/v1/timeslots/:timeslot_id", this.timeSlotController.deleteTimeSlot.bind(this.timeSlotController)
        );
        
        this.router.put(
            "/v1/timeslots/:timeslot_id", 
            this.timeSlotController.updateTimeSlot.bind(this.timeSlotController)
        );
    };
};

export default new TimeSlot().router;
