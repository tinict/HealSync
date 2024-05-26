import * as _ from 'lodash';

export class IAModel {
    static toIAM = (entity: any) => {
        return {
            identity_id: _.get(entity, 'identity_id'),
            username: _.get(entity, 'username'),
            model_id: _.get(entity, 'model_id'),
            model_type: _.get(entity, 'model_type'),
            role_name: _.get(entity, 'role_name'),
            role_permission_id: _.get(entity, 'role_permission_id'),
            permission_id: _.get(entity, 'permission_id'),
            permission_name: _.get(entity, 'permission_name'),
        };
    }
};