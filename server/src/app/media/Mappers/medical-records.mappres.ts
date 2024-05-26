import * as _ from 'lodash';

export class MedicalRecordMapper {
    static toMedicalRecord = (entity: any) => {
        return {
            user_id: _.get(entity, 'user_id'),
            patient_id: _.get(entity, 'patient_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            filepath: _.get(entity, 'filepath'),
        };
    }
};
