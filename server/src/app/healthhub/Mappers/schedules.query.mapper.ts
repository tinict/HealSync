import { ScheduleQueryModel } from "../Models";

export class ScheduleQueryMapper {
    public static toScheduleQueryMapper(dataRequest: any): ScheduleQueryModel {
        let ScheduleQuery: ScheduleQueryModel = {} as ScheduleQueryModel;
        return Object.assign(ScheduleQuery, dataRequest);
    }
}