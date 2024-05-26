import 'reflect-metadata';
import { Router } from "express";
import { DoctorController } from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class DoctorRoutes {
    private doctorController: DoctorController;
    router = Router();

    constructor() {
        this.doctorController = AppServiceProvider.getContainer().resolve(DoctorController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.get(
            "/v1/doctors", 
            this.doctorController.getAll.bind(this.doctorController)
        );
        this.router.get(
            "/v1/doctors/day/:datework", 
            this.doctorController.getDoctorByTime.bind(this.doctorController)
        );
        this.router.get(
            "/v1/doctors/profile/:id", 
            this.doctorController.getDoctorById.bind(this.doctorController)
        );
        this.router.put(
            "/v1/doctors/bio", 
            this.doctorController.updateBioDoctor.bind(this.doctorController)
        );
        this.router.put(
            "/v1/doctor/profile", 
            this.doctorController.updateProfileDoctor.bind(this.doctorController)
        );
    };
};

export default new DoctorRoutes().router;