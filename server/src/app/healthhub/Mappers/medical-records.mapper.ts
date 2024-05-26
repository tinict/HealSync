import * as _ from 'lodash';

export class MedicalRecordMapper {
    static toMedicalRecord = (entity: any) => {
        return {
            customer_id: _.get(entity, 'patient_id'),
            doctor_id: _.get(entity, 'user_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            diagnostic_records: _.get(entity, 'filepath'),
        };
    }
};
