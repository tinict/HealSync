import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    MedicalRecordEntity,
    MedicalRecordEntity as MedicalRecordRepository,
    CustomerEntity as CustomerRepository,
    DoctorEntity as DoctorRepository,
    AppointmentEntity as AppointmentRepository,
    CustomerEntity,
    TimeSlotEntity as TimeSlotRepository,
    ReExaminationScheduleEntity as ReExaminationScheduleRepository,
    ReExaminationScheduleEntity
} from '../Entities';

@injectable()
export class ReExaminationScheduleService {

    constructor() { };

    async createReSchedule(reExaminationScheduleModel: any) {
        try {
            const reExaminationSchedule = new ReExaminationScheduleEntity();

            const appointmentEntity = await AppointmentRepository.findOne({ where: { appointment_id: reExaminationScheduleModel.appointment_id } });

            if (
                !appointmentEntity
            ) {
                throw new Error("Appointment not found");
            }

            reExaminationSchedule.appointmentEntity = appointmentEntity;
            reExaminationSchedule.endDay = reExaminationScheduleModel.endDay;

            return await ReExaminationScheduleRepository.save(reExaminationSchedule);
        } catch (error: any) {
            throw error;
        }
    };

    async getReExaminationSchedule(reExaminationModal: any) {
        try {
            const reExaminationSchedule = await ReExaminationScheduleRepository
                .createQueryBuilder("tbl_re_examination_schedules")
                .leftJoinAndSelect("tbl_re_examination_schedules.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_re_examination_schedules.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_doctors.doctor_id = :doctor_id", { doctor_id: reExaminationModal.doctor_id })
                .orWhere("tbl_customers.customer_id = :customer_id", { customer_id: reExaminationModal.customer_id })
                .getMany();

            return reExaminationSchedule;
        } catch (error: any) {
            throw error;
        }
    };

    async getReExamination(reExaminationModal: any) {
        try {
            const reExaminationSchedule = await ReExaminationScheduleRepository
                .createQueryBuilder("tbl_re_examination_schedules")
                .leftJoinAndSelect("tbl_re_examination_schedules.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.medicalRecordEntity", "tbl_medical_records")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_customers.customer_id = :customer_id", { customer_id: reExaminationModal.customer_id })
                .orWhere("tbl_doctors.doctor_id = :doctor_id", { doctor_id: reExaminationModal.doctor_id })
                .getMany();
    
            return reExaminationSchedule;
        } catch (error: any) {
            throw error;
        }
    };

    async updateReExaminationSchedule(appointment_id: any, updatedData: any) {
        try {
            const appointment = await AppointmentRepository.findOne({ where: { appointment_id: Number(appointment_id) } });
            if(!appointment) {
                throw new Error('Appointment not found');
            }
            const reExaminationSchedule = await ReExaminationScheduleRepository.findOne({ where: { appointmentEntity: appointment } });

            if (!reExaminationSchedule) {
                throw new Error('Re-examination schedule not found');
            }
            const timeSlotEntity = await TimeSlotRepository.findOne({ where: { timeslot_id: updatedData.timeslot_id } });
            if (!timeSlotEntity) {
                throw new Error('TimeSlot not found');
            }

            if (updatedData.timeslot_id !== undefined)
                reExaminationSchedule.timeSlotEntity = timeSlotEntity;

            if (updatedData.status !== undefined)
                reExaminationSchedule.status = updatedData.status;

            if (updatedData.ordinalNumber !== undefined)
                reExaminationSchedule.ordinalNumber = updatedData.ordinalNumber;

            const updatedReExaminationSchedule = await ReExaminationScheduleRepository.save(reExaminationSchedule);

            return updatedReExaminationSchedule;
        } catch (error: any) {
            throw error;
        }
    };
};
