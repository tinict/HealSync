import * as _ from 'lodash';

export class PatientMapper {
    static toPatient = (entity: any) => {
        return {
            examination_record_id: _.get(entity, 'patient_id'),
            createdAt: _.get(entity, 'createdAt'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            dob: _.get(entity, 'dob'),
            email: _.get(entity, 'email'),
            phone: _.get(entity, 'phone'), 
            gender: _.get(entity, 'gender'), 
            address: _.get(entity, 'address'), 
            guardianName: _.get(entity, 'guardianName'), 
            medicalHistory: _.get(entity, 'medicalHistory'), 
            reasonForConsultation: _.get(entity, 'reasonForConsultation'), 
            idCardNumber: _.get(entity, 'idCardNumber'),
            datework: _.get(entity, 'datework'),
            schedule_type_name: _.get(entity, 'schedule_type_name'),
            starttime: _.get(entity, 'starttime'),
            endtime: _.get(entity, 'endtime'),
            cost: _.get(entity, 'cost'),
            status_appointment: _.get(entity, 'status_appointment'),
            customer_id: _.get(entity, 'customer_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            typeSchedule: _.get(entity, 'typeSchedule'),
        };
    }
};
