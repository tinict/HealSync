import * as _ from 'lodash';

export class CreateInvoiceMapper {
    static toCreateInvoice = (entity: any) => {
        return {
            customer_id: _.get(entity, 'customer_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            invoice_id: _.get(entity, 'invoice_id'),
            status: _.get(entity, 'status'),
            create_at: _.get(entity, 'create_at'),
            due_at: _.get(entity, 'due_at'),
        };
    }
};