import 'reflect-metadata';
import { Router } from "express";
import { 
    ExaminationRecordController 
} from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class ExaminationRecordRoute {
    private examinationRecordController: ExaminationRecordController;
    router = Router();

    constructor() {
        this.examinationRecordController = AppServiceProvider.getContainer().resolve(ExaminationRecordController);
        this.intializeRoutes();
    }; 

    intializeRoutes() {
        this.router.get(
            "/v1/examination-records/:customer_id", 
            this.examinationRecordController.getExaminationRecord.bind(this.examinationRecordController)
        ); 

        this.router.get(
            "/v1/patients/:doctor_id", 
            this.examinationRecordController.getPatientByDoctor.bind(this.examinationRecordController)
        ); 
        
        this.router.get(
            "/v1/examination-records/check/:timeslot_id", 
            this.examinationRecordController.examinationExistTimeslot.bind(this.examinationRecordController)
        );

        this.router.get(
            "/v1/patient/all", 
            this.examinationRecordController.getPatientAll.bind(this.examinationRecordController)
        );
    };
};

export default new ExaminationRecordRoute().router;