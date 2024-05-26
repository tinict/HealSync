import { Gender } from "../Constants";

export interface ExaminationFormModel {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: string,
    gender: Gender,
    address: string,
    idCardNumber: string,
    guardianName: string,
    medicalHistory: string,
    pathName: string,
    reasonForConsultation: string
}