import { TimeSlotCreateModel } from "./timeslots.create.model";

export interface ScheduleCreateModel {
    datework: Date,
    schedule_type: number,
    doctor_id: string,
    localtion: string,
    timeslots: TimeSlotCreateModel[],
};
