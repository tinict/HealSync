import 'reflect-metadata';
import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { MedicalRecordController } from "../../../Controllers";

class MedicalRecordRoute {
    private medicalRecordController: MedicalRecordController;
    router = Router();

    constructor() {
        this.medicalRecordController = AppServiceProvider.getContainer().resolve(MedicalRecordController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/medical-records", 
            this.medicalRecordController.createMedicalRecord.bind(this.medicalRecordController)
        );

        this.router.get(
            "/v1/medical-records/:_id",
            this.medicalRecordController.getMedicalRecord.bind(this.medicalRecordController)
        );

        this.router.get(
            "/v1/medical/records",
            this.medicalRecordController.getMedicalRecordForCustomer.bind(this.medicalRecordController)
        );
    };
};

export default new MedicalRecordRoute().router;