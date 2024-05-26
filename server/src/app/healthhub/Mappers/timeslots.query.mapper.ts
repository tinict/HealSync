import { TimeSlotQueryModel } from "../Models";

export class TimeSlotQueryMapper {
    public static toTimeSlotQueryMapper(dataRequest: any): TimeSlotQueryModel {
        let TimeSlotQuery: TimeSlotQueryModel = {} as TimeSlotQueryModel;
        return Object.assign(TimeSlotQuery, dataRequest);
    }
}