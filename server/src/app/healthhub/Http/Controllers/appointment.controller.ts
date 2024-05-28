import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AppointmentService } from "../../Services";
import { AppointmentMapper, CustomerAppointmentMapper } from "../../Mappers";
import { TYPES } from "../../Database/types";

@injectable()
export class AppointmentController {
    constructor(
        @inject(TYPES.AppointmentService)
        private appointmentService: AppointmentService,
    ) { };

    async create(req: Request, res: Response) {
        try {
            const appointmentModel = AppointmentMapper.toAppointment(req.body);
            const appointment = await this.appointmentService.create(appointmentModel);
            res.status(200).json(appointment);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getAllAppointments(req: Request, res: Response) {
        try {
            const customer_id = req.params.customer_id;
            console.log(customer_id);
            if (customer_id) {
                const appointments = await this.appointmentService.getAppointments(customer_id);
                // const appointmentCustomerModel = CustomerAppointmentMapper.toCustomerAppointment({ appointments });
                return res.status(200).json(appointments);
            }
            return res.status(404).json("Not exist customer!");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    async getAllCustomerAppointmentDoctor(req: Request, res: Response) {
        try {
            const allCustomerAppointment = await this.appointmentService.getAllAppointment(req.params.doctor_id);
            console.log(allCustomerAppointment);
            return res.status(200).json(allCustomerAppointment);
        } catch (error: any) {
            return res.status(200).json(error);
        }
    };

    async updateSatusAppointment(req: Request, res: Response) {
        try {
            console.log(req.body);
            let updateAppointment = await this.appointmentService.updateStatusAppointment(Number(req.body.appointment_id), Number(req.body.status), Number(req.body.ordinalNumber), req.body.meetLink);
            res.status(200).json(updateAppointment);
        } catch (error: any) {
            res.status(500).json(error);
        }
    };

    async appointmentExistTimeSlot(req: Request, res: Response) {
        try {
            const { timeslot_id } = req.params;
            const timeSlot = await this.appointmentService.appointmentExistTimeslot(Number(timeslot_id));
            return res.status(200).json(timeSlot);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async updateAppointment(req: Request, res: Response) {
        try {
            console.log(req.body);
            const appointment = await this.appointmentService.updateAppointment(req.body.appointment_id, req.body);
            return res.status(200).json(appointment);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async getOrdinalNumber(req: Request, res: Response) {
        try {
            const ordinalNumber = await this.appointmentService.getOrdinalNumber(req.params.appointment_id);
            return res.status(200).json({ ordinalNumber });
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async getCheckOrdinalNumber(req: Request, res: Response) {
        try {
            const detailOrdinalNumber = await this.appointmentService.getCheckOrdinalNumber(req.params.appointment_id);
            return res.status(200).json({ detailOrdinalNumber });
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async getOrdinalNumberByTimeslotID(req: Request, res: Response) {
        try {
            const ordinalNumber = await this.appointmentService.getOrdinalNumberByTimeslotID(req.params.timeslot_id);
            return res.status(200).json({ ordinalNumber });
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async isExaminatedByDoctor(req: Request, res: Response) {
        try {
            const doctor_id = req.query.doctor_id;
            const isCheck = await this.appointmentService.isExaminatedByDoctor(req.params.customer_id, doctor_id);
            return res.status(200).json({ isCheck });
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async updateStatusListCustomerAppointment(req: Request, res: Response) {
        try {
            await this.appointmentService.updateStatusListCustomerAppointment(req.body.listCustomer);
            return res.status(200).send("Update status success!");
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };
};
