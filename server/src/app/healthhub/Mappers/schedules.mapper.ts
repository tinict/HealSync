import { ScheduleCreateModel } from "../Models";

export class ScheduleMapper {
    public static toScheduleMapper(dataRequest: any): ScheduleCreateModel {
        let ScheduleCreate: ScheduleCreateModel = {} as ScheduleCreateModel;
        return Object.assign(ScheduleCreate, dataRequest);
    }
}