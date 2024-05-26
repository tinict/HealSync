import { ExaminationFormModel } from "./examination-form.model";

export interface AppointmentCreateModel {
    timeslot_id: number;
    customer_id: number;
    cost: number;
    examinationForm: ExaminationFormModel;
};