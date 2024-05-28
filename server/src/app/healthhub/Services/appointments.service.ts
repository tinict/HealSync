import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    AppointmentEntity,
    AppointmentEntity as AppointmentModel,
    AppointmentEntity as AppointmentRepository,
    TimeSlotEntity as TimeSlotRepository,
    CustomerEntity as CustomerRepository,
    ExaminationRecordEntity,
    ExaminationRecordEntity as ExaminationRepository,
    ReExaminationScheduleEntity as ReExaminationScheduleRepository
} from '../Entities';
import { ExaminationRecordService } from './examination-records.service';
import { TYPES } from '../Database/types';
import { CustomerAppointmentMapper } from "../Mappers/customer-appointment.mapper";

@injectable()
export class AppointmentService {
    private examinationRecordService: ExaminationRecordService;

    constructor(
        @inject(TYPES.ExaminationRecordService)
        examinationRecordService: ExaminationRecordService,
    ) {
        this.examinationRecordService = examinationRecordService;
    };

    async create(appointmentCreateModel: any) {
        try {
            const timeSlot = await TimeSlotRepository.findOne({ where: { timeslot_id: appointmentCreateModel.timeslot_id } });
            if (!timeSlot) return null;

            const customer = await CustomerRepository.findOne({ where: { customer_id: appointmentCreateModel.customer_id } });
            if (!customer) return null;

            let appointmentEnity = new AppointmentEntity();

            appointmentEnity.timeSlotEntity = timeSlot;
            appointmentEnity.customerEntity = customer;

            let newAppointment = await AppointmentRepository.save(appointmentEnity);

            let examrecord = await this.examinationRecordService.create(newAppointment, appointmentCreateModel);
            console.log(examrecord);

            if (!examrecord) return null;

            return { appointmentEnity };
        } catch (err: any) {
            throw err;
        }
    };

    async getAppointments(customerId: string) {
        try {
            const listAppointment = await ExaminationRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_customers.customer_id = :customer_id",
                    {
                        customer_id: customerId
                    }
                )
                .getMany();

            let result: any[] = [];

            console.log(listAppointment);

            listAppointment.forEach((appointment: any) => {
                result.push(
                    CustomerAppointmentMapper.toCustomerAppointment(
                        {
                            ...appointment,
                            ...appointment.appointmentEntity,
                            ...appointment.appointmentEntity.timeSlotEntity,
                            ...appointment.appointmentEntity.customerEntity,
                            ...appointment.appointmentEntity.timeSlotEntity.scheduleEntity,
                        }
                    )
                );
            });

            return result;
        } catch (error: any) {
            throw error;
        }
    };

    async getAllAppointment(doctor_id: string) {
        try {
            const listAppointment = await ExaminationRepository
                .createQueryBuilder("tbl_examination_records")
                .leftJoinAndSelect("tbl_examination_records.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_schedules.doctor_id = :doctor_id",
                    {
                        doctor_id: doctor_id
                    }
                )
                .getMany();

            let result: any[] = [];

            listAppointment.forEach((appointment: any) => {
                const appointmentEntity = appointment?.appointmentEntity || {};
                const timeSlotEntity = appointmentEntity?.timeSlotEntity || {};
                const customerEntity = appointmentEntity?.customerEntity || {};
                const scheduleEntity = timeSlotEntity?.scheduleEntity || {};

                result.push(
                    CustomerAppointmentMapper.toCustomerAppointment(
                        {
                            ...appointment,
                            ...appointmentEntity,
                            ...timeSlotEntity,
                            ...customerEntity,
                            ...scheduleEntity,
                        }
                    )
                );
            });

            return result;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async updateStatusAppointment(appointment_id: number, status: number, ordinalNumber: number, meetLink: string) {
        try {
            const appointment = await AppointmentRepository.findOne({ where: { appointment_id } });
            if (!appointment) return null;

            appointment.status_appointment = status;

            if (appointment.ordinalNumber !== undefined && appointment.ordinalNumber !== null && !isNaN(ordinalNumber))
                appointment.ordinalNumber = ordinalNumber;

            if (meetLink !== undefined && meetLink !== null)
                appointment.meetLink = meetLink;

            console.log(appointment);

            await AppointmentRepository.save(appointment);

            return appointment;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async appointmentExistTimeslot(timeslot_id: number) {
        try {
            const appointments = await AppointmentRepository
                .createQueryBuilder("tbl_appointments")
                .leftJoin('tbl_appointments.timeSlotEntity', 'tbl_timeslot')
                .where("tbl_timeslot.timeslot_id = :timeslot_id", { timeslot_id })
                .getMany();

            return appointments;
        } catch (error: any) {
            throw error
        }
    };

    async updateAppointment(appointment_id: any, updatedData: any) {
        try {
            console.log(updatedData);

            const appointment = await AppointmentRepository.findOne({ where: { appointment_id: Number(appointment_id) } });

            if (!appointment) return;

            if (updatedData.appointment_id !== undefined) {
                appointment.appointment_id = updatedData.appointment_id;
            }

            if (updatedData.status_appointment !== undefined) {
                appointment.status_appointment = updatedData.status_appointment;
            }

            if (updatedData.timeslot_id !== undefined) {
                const timeslot = await TimeSlotRepository.findOne({ where: { timeslot_id: Number(updatedData.timeslot_id) } });
                if (!timeslot) return;
                appointment.timeSlotEntity = timeslot;

                // const ordinalNumber_appointment = await AppointmentRepository.count({ where: { timeSlotEntity: timeslot, status_appointment: 1 } });
                // appointment.ordinalNumber = ordinalNumber_appointment + 1;
            }

            if (updatedData.ordinalNumber !== undefined) {
                appointment.ordinalNumber = updatedData.ordinalNumber;
            }

            const updatedAppointment = await AppointmentRepository.save(appointment);

            return updatedAppointment;
        } catch (error: any) {
            throw error;
        }
    };

    async getOrdinalNumber(appointment_id: any) {
        try {
            const appointment = await AppointmentRepository.findOne({
                where: { appointment_id: Number(appointment_id) },
                relations: ['timeSlotEntity']
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            console.log(appointment.timeSlotEntity);

            // const ordinalNumber_appointment = await AppointmentRepository.count({ where: { timeSlotEntity: appointment.timeSlotEntity, status_appointment: 1 } });
            
            const result = await AppointmentRepository
                .createQueryBuilder('tbl_appointments')
                .select('MAX(tbl_appointments.ordinalNumber)', 'maxOrdinalNumber')
                .leftJoin('tbl_appointments.timeSlotEntity', 'tbl_timeslot')
                .where('tbl_appointments.timeslot_id = :timeslot_id AND tbl_appointments.status_appointment = :status', {
                    timeslot_id: appointment.timeSlotEntity.timeslot_id,
                    status: 1
                })
                .getRawOne();

            const maxOrdinalNumber = result?.maxOrdinalNumber;
            console.log('Max ordinal number:', maxOrdinalNumber);

            // const ordinalNumber_reExamination = await ReExaminationScheduleRepository.count({ where: { timeSlotEntity: appointment.timeSlotEntity, status: 1 } });
            
            const resultRe = await ReExaminationScheduleRepository
                .createQueryBuilder('tbl_re_examination_schedules')
                .select('MAX(tbl_re_examination_schedules.ordinalNumber)', 'maxOrdinalNumberRe')
                .leftJoin('tbl_re_examination_schedules.timeSlotEntity', 'tbl_timeslot')
                .where('tbl_timeslot.timeslot_id = :timeslot_id AND tbl_re_examination_schedules.status = :status', {
                    timeslot_id: appointment.timeSlotEntity.timeslot_id,
                    status: 1
                })
                .getRawOne();

            const maxOrdinalNumberRe = resultRe?.maxOrdinalNumberRe;
            console.log('Max ordinal number:', maxOrdinalNumberRe);

            const ordinalNumberLast = Math.max(maxOrdinalNumber, maxOrdinalNumberRe) + 1;

            // let ordinalNumber = ordinalNumber_appointment + ordinalNumber_reExamination;

            // if (ordinalNumber === 0) ordinalNumber = 1;

            return ordinalNumberLast;
        } catch (error: any) {
            throw error;
        }
    };

    async getAppointmentsBySchedule(schedule_id: number) {
        try {
            const appointments = await AppointmentRepository
                .createQueryBuilder("tbl_appointments")
                .leftJoinAndSelect('tbl_appointments.timeSlotEntity', 'tbl_timeslot')
                .leftJoinAndSelect('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .leftJoinAndSelect('tbl_schedules.doctorEntity', 'tbl_doctors')
                .where("tbl_schedules.schedule_id = :schedule_id and tbl_appointments.ordinalNumber = 1 and tbl_appointments.status_appointment = 1",
                    {
                        schedule_id
                    }
                )
                .getMany();
            return appointments;
        } catch (error: any) {
            throw error;
        }
    };

    async getCheckOrdinalNumber(appointment_id: any) {
        try {
            const appointment = await AppointmentRepository.findOne({
                where: { appointment_id: Number(appointment_id) },
                relations: ['timeSlotEntity', 'examinationRecordEntity']
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            console.log(appointment.timeSlotEntity);

            const ordinalNumber = await AppointmentRepository.findOne({ where: { timeSlotEntity: appointment.timeSlotEntity, status_appointment: 5 } });

            return { ordinalNumber, examinationRecord: appointment.examinationRecordEntity, appointment };
        } catch (error: any) {
            throw error;
        }
    };

    async getOrdinalNumberByTimeslotID(timeslot_id: any) {
        try {
            const timeslot = await TimeSlotRepository.findOne({ where: { timeslot_id } });

            if (!timeslot) {
                throw new Error('Timeslot not found');
            }

            // const ordinalNumber_appointment = await AppointmentRepository.count({ where: { timeSlotEntity: timeslot, status_appointment: 1 } });

            const result = await AppointmentRepository
                .createQueryBuilder('tbl_appointments')
                .select('MAX(tbl_appointments.ordinalNumber)', 'maxOrdinalNumber')
                .leftJoin('tbl_appointments.timeSlotEntity', 'tbl_timeslot')
                .where('tbl_timeslot.timeslot_id = :timeslot_id AND tbl_appointments.status_appointment = :status', {
                    timeslot_id: timeslot.timeslot_id,
                    status: 1
                })
                .getRawOne();

            const maxOrdinalNumber = result?.maxOrdinalNumber;
            console.log('Max ordinal number:', maxOrdinalNumber);


            // const ordinalNumber_reExamination = await ReExaminationScheduleRepository.count({ where: { timeSlotEntity: timeslot, status: 1 } });

            const resultRe = await ReExaminationScheduleRepository
                .createQueryBuilder('tbl_re_examination_schedules')
                .select('MAX(tbl_re_examination_schedules.ordinalNumber)', 'maxOrdinalNumberRe')
                .leftJoin('tbl_re_examination_schedules.timeSlotEntity', 'tbl_timeslot')
                .where('tbl_timeslot.timeslot_id = :timeslot_id AND tbl_re_examination_schedules.status = :status', {
                    timeslot_id: timeslot.timeslot_id,
                    status: 1
                })
                .getRawOne();

            const maxOrdinalNumberRe = resultRe?.maxOrdinalNumberRe;
            console.log('Max ordinal number:', maxOrdinalNumberRe);

            const ordinalNumberLast = Math.max(maxOrdinalNumber, maxOrdinalNumberRe) + 1;

            // let ordinalNumber = ordinalNumber_appointment + ordinalNumber_reExamination;

            // if (ordinalNumber === 0) ordinalNumber = 1;

            return ordinalNumberLast;
        } catch (error: any) {
            throw error;
        }
    };

    async isExaminatedByDoctor(customer_id: string, doctor_id: any) {
        try {
            const appointments = await AppointmentRepository
                .createQueryBuilder("tbl_appointments")
                .leftJoinAndSelect('tbl_appointments.timeSlotEntity', 'tbl_timeslot')
                .leftJoinAndSelect('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .leftJoinAndSelect('tbl_schedules.doctorEntity', 'tbl_doctors')
                .where("tbl_appointments.customer_id = :customer_id and tbl_appointments.status_appointment = 2 and tbl_doctors.doctor_id = :doctor_id",
                    {
                        customer_id,
                        doctor_id
                    }
                )
                .getOne();

            return appointments;
        } catch (error: any) {
            throw error;
        }
    };

    async updateStatusListCustomerAppointment(listCustomer: any[]) {
        try {
            const timeslot = await AppointmentRepository.findOne({ where: { appointment_id: listCustomer[0].appointmentEntity.appointment_id } });
            if (!timeslot) return null;
            const reAppointments = await ReExaminationScheduleRepository.find({ where: { timeSlotEntity: timeslot.timeSlotEntity } });

            if (reAppointments !== null) {
                for (const reAppointment of reAppointments) {
                    reAppointment.status = 5;
                    await ReExaminationScheduleRepository.save(reAppointment);
                }
            }

            for (const customer of listCustomer) {
                const appointment = await AppointmentRepository.findOne({ where: { appointment_id: customer.appointmentEntity.appointment_id } });
                if (!appointment) continue;

                appointment.status_appointment = 4;

                await AppointmentRepository.save(appointment);
            }
        } catch (error: any) {
            throw error;
        }
    };
};