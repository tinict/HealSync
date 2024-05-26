import { TimeSlotCreateModel } from "./timeslots.create.model";

export interface ScheduleCreateModel {
    datework: Date,
    typeSchedule: any,
    doctor_id: string,
    localtion: string,
    timeslots: TimeSlotCreateModel[],
};
