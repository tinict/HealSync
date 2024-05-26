import 'reflect-metadata';
import { Router } from "express";
import { AppointmentController } from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class Appointment {
    private appointmentController: AppointmentController;
    router = Router();

    constructor() {
        this.appointmentController = AppServiceProvider.getContainer().resolve(AppointmentController);
        this.intializeRoutes();
    }; 

    intializeRoutes() {
        this.router.post(
            "/v1/appointments", 
            this.appointmentController.create.bind(this.appointmentController)
        );

        this.router.get(
            "/v1/appointments/customer/:customer_id", 
            this.appointmentController.getAllAppointments.bind(this.appointmentController)
        ); 

        this.router.get(
            "/v1/appointments/doctor/:doctor_id", 
            this.appointmentController.getAllCustomerAppointmentDoctor.bind(this.appointmentController)
        );

        this.router.post(
            "/v1/appointments/status", 
            this.appointmentController.updateSatusAppointment.bind(this.appointmentController)
        );

        this.router.get(
            "/v1/appointments/check/:timeslot_id", 
            this.appointmentController.appointmentExistTimeSlot.bind(this.appointmentController)
        );
        this.router.put(
            "/v1/appointments", 
            this.appointmentController.updateAppointment.bind(this.appointmentController)
        );

        this.router.get(
            "/v1/appointment/ordinal-number/:appointment_id", 
            this.appointmentController.getOrdinalNumber.bind(this.appointmentController)
        );

        this.router.get(
            "/v1/appointment/realtime-ordinal-number/:appointment_id", 
            this.appointmentController.getCheckOrdinalNumber.bind(this.appointmentController)
        );

        this.router.get(
            "/v1/appointment/examination/ordinal-number/:timeslot_id", 
            this.appointmentController.getOrdinalNumberByTimeslotID.bind(this.appointmentController)
        );
        
        this.router.get(
            "/v1/appointment/check-feedback/:customer_id", 
            this.appointmentController.isExaminatedByDoctor.bind(this.appointmentController)
        );

        this.router.put(
            "/v1/appointment/list-customer", 
            this.appointmentController.updateStatusListCustomerAppointment.bind(this.appointmentController)
        );
    };
};

export default new Appointment().router;