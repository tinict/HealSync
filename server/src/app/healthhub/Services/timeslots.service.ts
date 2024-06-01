import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    ScheduleEntity,
    TimeSlotEntity,
    TimeSlotEntity as TimeSlotModel,
    TimeSlotEntity as TimeSlotRepository,
    DoctorEntity as DoctorRepository,
    DoctorEntity,
    AppointmentEntity as AppointmentRepository
} from '../Entities';
import {
    ScheduleCreateModel,
    TimeSlotQueryModel
} from "../Models";
import { TYPES } from "../Database/types";
import { AppointmentService } from './appointments.service';

@injectable()
export class TimeSlotService {
    private appointmentService: AppointmentService;

    constructor(
        @inject(TYPES.AppointmentService)
        appointmentService: AppointmentService
    ) {
        this.appointmentService = appointmentService;
    };

    async create(scheduleCreateModel: ScheduleCreateModel, newSchedule: ScheduleEntity, doctor: DoctorEntity) {
        try {
            let newTimeSlot = new TimeSlotEntity();

            newTimeSlot.cost = scheduleCreateModel.timeslots[0].cost;
            newTimeSlot.count_person = scheduleCreateModel.timeslots[0].count_person;
            newTimeSlot.starttime = scheduleCreateModel.timeslots[0].starttime;
            newTimeSlot.endtime = scheduleCreateModel.timeslots[0].endtime;
            newTimeSlot.localtion = scheduleCreateModel.localtion;
            newTimeSlot.scheduleEntity = newSchedule;

            const isExist = await this.existTypeSchedule(newTimeSlot, newSchedule, doctor);
            console.log(isExist);

            if (!isExist) return null;
            return await TimeSlotRepository.save(newTimeSlot);
        } catch (error: any) {
            throw error;
        }
    };

    async existTypeSchedule(newTimeSlot: TimeSlotModel, newSchedule: ScheduleEntity, doctor: DoctorEntity): Promise<Boolean> {
        try {
            const countRecord = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_schedules.doctor_id = :doctor_id and tbl_schedules.datework = :datework and tbl_schedules.isActive = :isActive and ((tbl_timeslot.starttime >= :starttime and tbl_timeslot.starttime < :endtime) or (tbl_timeslot.endtime > :starttime and tbl_timeslot.endtime <= :endtime) or (tbl_timeslot.starttime <= :starttime and tbl_timeslot.endtime >= :endtime))",
                    {
                        starttime: newTimeSlot.starttime,
                        endtime: newTimeSlot.endtime,
                        datework: newSchedule.datework,
                        doctor_id: doctor.doctor_id,
                        isActive: true
                    }
                )
                .getCount();
            if (countRecord > 0)
                return false;
            return true;
        } catch (error: any) {
            throw error;
        }
    };

    async getTimeSlotBySchedule(timeSlotQueryModel: any) {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: timeSlotQueryModel.doctor_id } });
            if (!doctorEntity) return [];

            let currentDate;

            if (!isNaN(Date.parse(timeSlotQueryModel.datework))) {
                currentDate = new Date(timeSlotQueryModel.datework);
                currentDate = currentDate.toISOString().split('T')[0];
            } 
            
            const timeSlots = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .leftJoin('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .where("tbl_schedules.doctor_id = :doctorId and tbl_schedules.datework = :datework and tbl_schedules.typeSchedule = :typeSchedule", {
                    doctorId: doctorEntity.doctor_id,
                    datework: currentDate,
                    typeSchedule: timeSlotQueryModel.typeSchedule
                })
                .getMany();

            const results: any[] = [];

            for (const timeslot of timeSlots) {
                const countAppointment: any = await this.appointmentService.countAppointments(timeslot.timeslot_id);
                if (countAppointment < timeslot.count_person) {
                    results.push(timeslot);
                }
            }

            return results;
        } catch (error: any) {
            throw error;
        }
    };

    async findAllTimeSlot() {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: "1" } });
            if (!doctorEntity) return [];
            const timeSlots = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .leftJoin('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .where("tbl_schedules.doctor_id = :doctorId and tbl_schedules.datework = :datework",
                    {
                        doctorId: doctorEntity.doctor_id,
                        datework: '2024-03-19',
                    })
                .getMany();
            return timeSlots;
        } catch (error: any) {
            throw error;
        }
    };

    async findByPeroid(timeSlotQueryModel: any) {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: timeSlotQueryModel.doctor_id } });
            console.log(timeSlotQueryModel);
            if (!doctorEntity) return [];
            var currentDate;
            if (!isNaN(Date.parse(timeSlotQueryModel.datework))) {
                currentDate = new Date(timeSlotQueryModel.datework);
                currentDate = currentDate.toISOString().split('T')[0];
            }
            const timeSlots = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .leftJoin('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .where("tbl_timeslot.timeslot_id = :timeslot_id AND tbl_schedules.doctor_id = :doctorId AND tbl_schedules.datework = :datework AND tbl_timeslot.starttime < :endtime AND tbl_timeslot.endtime > :starttime",
                    {
                        timeslot_id: timeSlotQueryModel.timeslot_id,
                        doctorId: doctorEntity.doctor_id,
                        datework: currentDate,
                        starttime: timeSlotQueryModel.starttime,
                        endtime: timeSlotQueryModel.endtime,
                    })
                .getMany();

            const results: any[] = [];

            for (const timeslot of timeSlots) {
                const countAppointment: any = await this.appointmentService.countAppointments(timeslot.timeslot_id);
                if (countAppointment < timeslot.count_person) {
                    results.push(timeslot);
                }
            }

            return results;
        } catch (error: any) {
            throw error;
        }
    };

    async findByScheduleType(timeSlotQueryModel: any) {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: timeSlotQueryModel.doctor_id } });
            console.log(timeSlotQueryModel);
            if (!doctorEntity) return;
            var currentDate;
            if (!isNaN(Date.parse(timeSlotQueryModel.datework))) {
                currentDate = new Date(timeSlotQueryModel.datework);
                currentDate = currentDate.toISOString().split('T')[0];
            }

            const timeSlots = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .leftJoin('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .where("tbl_schedules.typeSchedule = :typeSchedule AND tbl_schedules.doctor_id = :doctorId AND tbl_schedules.datework = :datework",
                    {
                        doctorId: doctorEntity.doctor_id,
                        datework: currentDate,
                        typeSchedule: timeSlotQueryModel.typeSchedule,
                    })
                .getMany();

            const results: any[] = [];

            for (const timeslot of timeSlots) {
                const countAppointment: any = await this.appointmentService.countAppointments(timeslot.timeslot_id);
                if (countAppointment < timeslot.count_person) {
                    results.push(timeslot);
                }
            }

            return results;
        } catch (error: any) {
            throw error;
        }
    };

    async findAll() {
        return await TimeSlotRepository.find();
    };

    async findOne(option: Object): Promise<TimeSlotModel | null> {
        return await TimeSlotRepository.findOne(option);
    };

    async updateTimeSlot(timeslotModel: any) {
        try {
            const timeslotEntity = await TimeSlotRepository.findOne({ where: { timeslot_id: timeslotModel.timeslot_id } });

            if (!timeslotEntity) {
                throw new Error('Timeslot not found');
            }

            if (timeslotModel.count_person !== undefined) {
                timeslotEntity.count_person = timeslotModel.count_person;
            }
            if (timeslotModel.starttime !== undefined) {
                timeslotEntity.starttime = timeslotModel.starttime;
            }
            if (timeslotModel.endtime !== undefined) {
                timeslotEntity.endtime = timeslotModel.endtime;
            }
            if (timeslotModel.cost !== undefined) {
                timeslotEntity.cost = timeslotModel.cost;
            }
            if (timeslotModel.localtion !== undefined) {
                timeslotEntity.localtion = timeslotModel.localtion;
            }
            if (timeslotModel.scheduleEntity !== undefined) {
                timeslotEntity.scheduleEntity = timeslotModel.scheduleEntity;
            }
            if (timeslotModel.isActive !== undefined) {
                timeslotEntity.isActive = timeslotModel.isActive;
            }

            return await TimeSlotRepository.save(timeslotEntity);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async removeTimeSlot(timeslot_id: number) {
        try {
            return await TimeSlotRepository.createQueryBuilder()
                .delete()
                .from('tbl_timeslot')
                .where("timeslot_id = :timeslot_id", { timeslot_id })
                .execute();
        } catch (error: any) {
            throw error;
        }
    };
};