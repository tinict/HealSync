import * as _ from 'lodash';

export class ExaminationRecordMapper {
    static toExaminationRecord = (entity: any) => {
        return {
            timeslot_id: _.get(entity, 'timeslot_id'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            email: _.get(entity, 'email'),
            phone: _.get(entity, 'phone'),
            dob: _.get(entity, 'dob'),
            gender: _.get(entity, 'gender'),
            address: _.get(entity, 'address'),
            idCardNumber:  _.get(entity, 'idCardNumber'),
            guardianName: _.get(entity, 'guardianName'),
            medicalHistory: _.get(entity, 'medicalHistory'),
            pathName: _.get(entity, 'pathName'),
            reasonForConsultation: _.get(entity, 'reasonForConsultation'),
            appointment_id: _.get(entity, 'appointment_id'),
            identity_id: _.get(entity, 'identity_id'),
        };
    }
};
