import 'reflect-metadata';
import { 
    inject, 
    injectable 
} from "inversify";
import {
    TimeSlotEntity as TimeSlotRepository,
    ScheduleEntity as ScheduleModel,
    ScheduleEntity as ScheduleRepository,
    DoctorEntity as DoctorModel,
    DoctorEntity as DoctorRepository,

} from '../Entities';
import {
    ScheduleCreateModel,
    ScheduleQueryModel
} from "../Models";
import { TimeSlotService } from './timeslots.service';
import { TYPES } from "../Database/types";

@injectable()
export class ScheduleService {
    private timeSlotService: TimeSlotService;

    constructor(
        @inject(TYPES.TimeSlotService)
        timeSlotService: TimeSlotService,
    ) {
        this.timeSlotService = timeSlotService;
    };

    async create(scheduleCreateModel: ScheduleCreateModel) {
        try {
            const doctor = await DoctorRepository.findOne({ where: { doctor_id: scheduleCreateModel.doctor_id } });
            if (doctor) {
                const flag = await this.verifySchedule(scheduleCreateModel, doctor);
                console.log("Đã tồn tại schedlue", flag);
                if (flag === null) {
                    const schedule = new ScheduleModel();

                    schedule.datework = scheduleCreateModel.datework;
                    schedule.doctorEntity = doctor;
                    schedule.typeSchedule = scheduleCreateModel.typeSchedule;

                    const newSchedule = await ScheduleRepository.save(schedule);

                    const isCreateTimeSlot = await this.timeSlotService.create(scheduleCreateModel, newSchedule, doctor);
                    if (!isCreateTimeSlot) return null;

                    return isCreateTimeSlot;
                } else {
                    if (flag) {
                        console.log(flag);
                        // let newSchedule = await ScheduleRepository.findOne({ where: { schedule_id: flag.schedule_id } });
                        let newSchedule = await ScheduleRepository
                            .createQueryBuilder("tbl_schedules")
                            .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                            .where("tbl_schedules.schedule_id = :schedule_id",
                                {
                                    schedule_id: flag.schedule_id
                                }
                            )
                            .getOne();

                        if (!newSchedule)
                            return null;

                        const isCreateTimeSlot = await this.timeSlotService.create(scheduleCreateModel, newSchedule, doctor);
                        if (!isCreateTimeSlot)
                            return null;

                        return isCreateTimeSlot;
                    } else {
                        return null;
                    }
                }
            }
            return null;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async verifySchedule(newSchedule: any, doctorModel: any) {
        try {
            const isSchedule = await ScheduleRepository.findOne(
                {
                    where: {
                        datework: newSchedule.datework,
                        doctorEntity: doctorModel,
                        typeSchedule: newSchedule.typeSchedule
                    }
                }
            );

            if (isSchedule)
                return isSchedule;
            return null;
        } catch (error: any) {
            throw error;
        }
    };

    async findAll() {
        return await ScheduleRepository.find();
    };

    async findOne(option: Object): Promise<ScheduleModel | null> {
        return await ScheduleRepository.findOne(option);
    };

    async update(schedule_id: number, scheduleQueryModel: ScheduleQueryModel) {
        try {
            const schedule = await ScheduleRepository.findOne({ where: { schedule_id: schedule_id } });
            if (!schedule) return false;
            //Update schedule
            if (scheduleQueryModel.datework !== null)
                schedule.datework = scheduleQueryModel.datework;
            if (scheduleQueryModel.isActive !== null)
                scheduleQueryModel.isActive === "true" ? schedule.isActive = true : schedule.isActive = false;

            await ScheduleRepository.save(schedule);
            return true;
        } catch (error: any) {
            throw error;
        }
    };

    async remove(schedule_id: number) {
        const schedule = await ScheduleRepository.findOne({ where: { schedule_id: schedule_id } });
        if (!schedule) return false;
        return await ScheduleRepository.remove(schedule);
    };

    async getSchedules(doctor_id: string) {
        try {
            const doctor = await DoctorRepository.findOne({ where: { doctor_id: doctor_id } });
            if (!doctor) return [];
            const schedules = await TimeSlotRepository
                .createQueryBuilder("tbl_timeslot")
                .select(["tbl_timeslot", "tbl_schedules", "tbl_doctors"])
                .leftJoin('tbl_timeslot.scheduleEntity', 'tbl_schedules')
                .leftJoin('tbl_schedules.doctorEntity', 'tbl_doctors')
                .where('tbl_schedules.doctor_id = :doctor_id', { doctor_id: doctor_id })
                .getMany();
            return schedules;
        } catch (error: any) {
            throw error;
        }
    };

    async getListDoctorByDate(date: any) {
        try {
            const doctors = await ScheduleRepository
                .createQueryBuilder("tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_schedules.datework = :datework and tbl_schedules.typeSchedule = 1",
                    {
                        datework: date
                    }
                )
                .getMany();
            return doctors;
        } catch (error: any) {
            throw error;
        }
    };
};
