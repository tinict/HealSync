import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    ExaminationRecordEntity,
    AppointmentEntity,
    ExaminationRecordEntity as ExaminationRecordRepository,
} from '../Entities';
import { PatientMapper } from "../Mappers";

@injectable()
export class ExaminationRecordService {

    constructor() { };

    async create(appointmentEntity: AppointmentEntity, appointmentCreateModel: any) {
        try {
            let examrecord = new ExaminationRecordEntity();

            examrecord.appointmentEntity = appointmentEntity;
            examrecord.firstname = appointmentCreateModel.examination_record.firstname;
            examrecord.lastname = appointmentCreateModel.examination_record.lastname;
            examrecord.address = appointmentCreateModel.examination_record.address;
            examrecord.phone = appointmentCreateModel.examination_record.phone;
            examrecord.gender = Number(appointmentCreateModel.examination_record.gender);
            examrecord.dob = appointmentCreateModel.examination_record.dob;
            examrecord.email = appointmentCreateModel.examination_record.email;
            examrecord.guardianName = appointmentCreateModel.examination_record.guardianName;
            examrecord.medicalHistory = appointmentCreateModel.examination_record.medicalHistory;
            examrecord.reasonForConsultation = appointmentCreateModel.examination_record.reasonForConsultation;
            examrecord.idCardNumber = appointmentCreateModel.examination_record.idCardNumber;
            examrecord.nation = appointmentCreateModel.examination_record.nation,
            examrecord.career = appointmentCreateModel.examination_record.career,
            examrecord.guardian_phone_number = appointmentCreateModel.examination_record.guardian_phone_number

            return await ExaminationRecordRepository.save(examrecord);
        } catch (err: any) {
            throw err;
        }
    };

    async getExaminationRecord(customer_id: string) {
        try {
            const examination = await ExaminationRecordRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_customers.customer_id = :customer_id",
                    {
                        customer_id: customer_id
                    }
                )
                .getMany();

            return examination;
        } catch (err: any) {
            throw err;
        }
    };

    async getPatientByDoctor(doctor_id: string) {
        try {
            const patients = await ExaminationRecordRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_doctors.doctor_id = :doctor_id",
                    {
                        doctor_id
                    }
                )
                .getMany();

            let result: any[] = [];

            console.log(patients);

            patients.forEach((patient) => {
                result.push(PatientMapper.toPatient({
                    ...patient,
                    ...patient.appointmentEntity,
                    ...patient.appointmentEntity.timeSlotEntity,
                    ...patient.appointmentEntity.customerEntity,
                    ...patient.appointmentEntity.timeSlotEntity.scheduleEntity,
                }));
            });

            return result;

        } catch (err: any) {
            throw err;
        }
    };

    async getPatientAll() {
        try {
            const patients = await ExaminationRecordRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .getMany();

            let result: any[] = [];

            console.log(patients);

            patients.forEach((patient) => {
                result.push(PatientMapper.toPatient({
                    ...patient,
                    ...patient.appointmentEntity,
                    ...patient.appointmentEntity.timeSlotEntity,
                    ...patient.appointmentEntity.customerEntity,
                    ...patient.appointmentEntity.timeSlotEntity.scheduleEntity,
                }));
            });

            return result;

        } catch (err: any) {
            throw err;
        }
    };

    async examinationExistTimeslot(timeslot_id: number) {
        try {
            const appointments = await ExaminationRecordRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_timeslot.timeslot_id = :timeslot_id", { timeslot_id })
                .getMany();
            return appointments;
        } catch (error: any) {
            throw error
        }
    };
};
