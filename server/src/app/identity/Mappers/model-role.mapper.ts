import * as _ from 'lodash';

export class ModelRoleMapper {
    static toModelRole = (entity: any) => {
        return {
            isActive: _.get(entity, 'isActive'),
            model_id: _.get(entity, 'model_id'),
            model_type: _.get(entity, 'model_type'),
            role_id: _.get(entity, 'role_id'),
            create_at: _.get(entity, 'create_at'),
            update_at: _.get(entity, 'update_at'),
            role_name: _.get(entity, 'role_name'),
        }
    }
};