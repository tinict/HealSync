import * as _ from 'lodash';

export class AppointmentMapper {
    static toAppointment = (entity: any) => {
        return {
            timeslot_id: _.get(entity, 'timeslot_id'),
            customer_id: _.get(entity, 'customer_id'),
            cost: _.get(entity, 'cost'),
            examination_record: _.get(entity, 'examination_record'),
        };
    }
};
