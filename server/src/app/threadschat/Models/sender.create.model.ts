import * as _ from 'lodash';

export class SenderCreateModel {
    static toSenderCreateModel = (entity: any) => {
        return {
            user_id: _.get(entity, 'user_id'),
            username: _.get(entity, 'username'),
        };
    }
};
