import 'reflect-metadata';
import { Router } from "express";
import { 
    ReExaminationScheduleController 
} from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class ReExaminationScheduleRoute {
    private reExaminationScheduleController : ReExaminationScheduleController ;
    router = Router();

    constructor() {
        this.reExaminationScheduleController = AppServiceProvider.getContainer().resolve(ReExaminationScheduleController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/re-examination-schedules", 
            this.reExaminationScheduleController.createReSchedule.bind(this.reExaminationScheduleController)
        );
        this.router.get(
            "/v1/re-examination-schedules", 
            this.reExaminationScheduleController.getReExaminationSchedule.bind(this.reExaminationScheduleController)
        );
        this.router.put(
            "/v1/re-examination-schedules", 
            this.reExaminationScheduleController.updateReSchedule.bind(this.reExaminationScheduleController)
        );
        this.router.get(
            "/v1/re-examinations", 
            this.reExaminationScheduleController.getReExamination.bind(this.reExaminationScheduleController)
        );
    };
};

export default new ReExaminationScheduleRoute().router;