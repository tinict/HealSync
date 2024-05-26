import * as _ from 'lodash';

export class ModelPermissionMapper {
    static toModelPermission = (entity: any) => {
        return {
            isActive: _.get(entity, 'isActive'),
            model_id: _.get(entity, 'model_id'),
            model_type: _.get(entity, 'model_type'),
            role_id: _.get(entity, 'role_id'),
            role_name: _.get(entity, 'role_name'),
            permission_name: _.get(entity, 'permission_name'),
            permission_id: _.get(entity, 'permission_id'),
        }
    }
};