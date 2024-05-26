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
} from '../Entities';

@injectable()
export class MedicalRecordService {

    constructor() { };

    async CreateRecord(medicalRecordModel: any) {
        try {
            const medicalRecord = new MedicalRecordEntity();

            const appointmentEntity = await AppointmentRepository.findOne({ where: { appointment_id: medicalRecordModel.appointment_id } });
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: medicalRecordModel.doctor_id } });
            const customerEntity = await CustomerRepository.findOne({ where: { customer_id: medicalRecordModel.customer_id } });

            if (
                !customerEntity ||
                !appointmentEntity ||
                !doctorEntity
            ) {
                throw new Error("Customer, Doctor or Appointment not found");
            }

            medicalRecord.diagnostic_records = medicalRecordModel.diagnostic_records;
            medicalRecord.appointmentEntity = appointmentEntity;
            medicalRecord.customerEntity = customerEntity;
            medicalRecord.doctorEntity = doctorEntity;

            await MedicalRecordRepository.save(medicalRecord);
        } catch (err: any) {
            throw err;
        }
    };

    async getListMedicalRecord(customer_id: string) {
        try {
            const medicalRecords = await MedicalRecordRepository
                .createQueryBuilder("tbl_medical_records")
                .leftJoinAndSelect("tbl_medical_records.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_medical_records.doctorEntity", "tbl_doctors")
                .leftJoinAndSelect("tbl_medical_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .where("tbl_customers.customer_id = :customer_id", { customer_id })
                .getMany();

            return medicalRecords;
        } catch (error: any) {
            throw error;
        }
    };

    async getMedicalRecordForCustomer(customer_id: any, appointment_id: any) {
        try {
            const medicalRecords = await MedicalRecordRepository
                .createQueryBuilder("tbl_medical_records")
                .leftJoinAndSelect("tbl_medical_records.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_medical_records.doctorEntity", "tbl_doctors")
                .leftJoinAndSelect("tbl_medical_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_appointments.reExaminationScheduleEntity", "tbl_re-examination-schedules")
                .where(
                    "tbl_customers.customer_id = :customer_id and tbl_appointments.appointment_id = :appointment_id", { customer_id, appointment_id }
                )
                .getMany();

            return medicalRecords;
        } catch (error: any) {
            throw error;
        }
    };
};
