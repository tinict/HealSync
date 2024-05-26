import * as _ from 'lodash';

export class VNPayUpdateModel {
    static toVNPayUpdate = (entity: any) => {
        return {
            vnp_TxnRef: _.get(entity, 'vnp_TxnRef'),
            vnp_PayDate: _.get(entity, 'vnp_PayDate'),
            vnp_TransactionStatus: _.get(entity, 'vnp_TransactionStatus'),
            vnp_BankCode: _.get(entity, 'vnp_BankCode'),
            vnp_ResponseCode: _.get(entity, 'vnp_ResponseCode'),
            vnp_CardType: _.get(entity, 'vnp_CardType'),
            vnp_TransactionNo: _.get(entity, 'vnp_TransactionNo'),
        };
    }
};