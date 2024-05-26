import * as _ from 'lodash';

export class VNPayPayModel {
    static toVNPayPay = (entity: any) => {
        return {
            vnp_Amount: _.get(entity, 'vnp_Amount'),
            user_id: _.get(entity, 'user_id'),
            vnp_CreateDate: _.get(entity, 'vnp_CreateDate'),
            vnp_TxnRef: _.get(entity, 'vnp_TxnRef'),
            vnp_OrderInfo: _.get(entity, 'vnp_OrderInfo'),
        };
    }
};
