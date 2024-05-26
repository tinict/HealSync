import * as _ from 'lodash';

export class UserCreateModel {
    static toUserCreateModel = (entity: any) => {
        return {
            user_id: _.get(entity, 'user_id'),
            userName: _.get(entity, 'userName'),
        };
    }
};