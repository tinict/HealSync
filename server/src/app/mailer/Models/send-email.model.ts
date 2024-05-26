import * as _ from 'lodash';

export class SendMailModel {
    static toSendMail = (entity: any) => {
        return {
            to: _.get(entity, 'to'),
            subject: _.get(entity, 'subject'),
            template: _.get(entity, 'template'),
            data: _.get(entity, 'data')
        };
    }
};
