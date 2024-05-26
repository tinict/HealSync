import * as _ from 'lodash';

export class MedicalCustomerRecordMapper {
    static toMedicalCustomerRecord = (entity: any) => {
        return {
            appointment_id: _.get(entity, 'appointment_id'),
            name: _.get(entity, 'name'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            create_at: _.get(entity, 'create_at'),
            diagnostic_records: _.get(entity, 'diagnostic_records')
        };
    }
};
