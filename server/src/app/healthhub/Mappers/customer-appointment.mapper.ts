import * as _ from 'lodash';

export class CustomerAppointmentMapper {
    static toCustomerAppointment = (entity: any) => {
        return {
            customer_id: _.get(entity, 'customer_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            name: _.get(entity, 'name'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            dob: _.get(entity, 'dob'),
            medicalHistory: _.get(entity, 'medicalHistory'),
            reasonForConsultation: _.get(entity, 'reasonForConsultation'),
            gender: _.get(entity, 'gender'),
            status_appointment: _.get(entity, 'status_appointment'),
            schedule_id: _.get(entity, 'schedule_id'),
            timeslot_id: _.get(entity, 'timeslot_id'),
            datework: _.get(entity, 'datework'),
            meetLink: _.get(entity, 'meetLink'),
            starttime: _.get(entity, 'starttime'),
            endtime: _.get(entity, 'endtime'),
            typeSchedule: _.get(entity, 'typeSchedule'),
        };
    }
};
