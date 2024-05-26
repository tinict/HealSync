import * as _ from 'lodash';

export class PayInvoiceMapper {
    static toPayInvoice = (entity: any) => {
        return {
            vnp_Amount: _.get(entity, 'vnp_Amount'),
            vnp_IpAddr: _.get(entity, 'vnp_IpAddr'),
            user_id: _.get(entity, 'user_id'),
            appointment_id: _.get(entity, 'appointment_id'),
        };
    }
};
