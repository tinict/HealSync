import * as _ from 'lodash';

export class NotificationMapper {
    static toNotification = (entity: any) => {
        return {
            identity_id: _.get(entity, 'identity_id'),
            message: _.get(entity, 'message'),
        };
    }
};
