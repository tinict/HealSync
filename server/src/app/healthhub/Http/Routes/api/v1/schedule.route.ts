import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { ScheduleController } from "../../../Controllers";

class Schedule {
    private scheduleController: ScheduleController;
    router = Router();

    constructor() {
        this.scheduleController = AppServiceProvider.getContainer().resolve(ScheduleController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/schedules", 
            this.scheduleController.create.bind(this.scheduleController)
        );
        this.router.delete(
            "/v1/schedules/:schedule_id", 
            this.scheduleController.delete.bind(this.scheduleController)
        );
        this.router.put(
            '/v1/schedules/:schedule_id', 
            this.scheduleController.update.bind(this.scheduleController)
        );
        this.router.get(
            '/v1/schedules/:doctor_id', 
            this.scheduleController.getSchedules.bind(this.scheduleController)
        );
    };
};

export default new Schedule().router;
