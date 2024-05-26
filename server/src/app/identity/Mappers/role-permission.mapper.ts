import * as _ from 'lodash';

export class RolePermissionMapper {
    static toRolePermission = (entity: any) => {
        return {
            role_id: _.get(entity, 'role_id'),
            role_name: _.get(entity, 'role_name'),
            permission_id: _.get(entity, 'permission_id'),
            permission_name: _.get(entity, 'permission_name'),
            isActive: _.get(entity, 'isActive'),
            create_at: _.get(entity, 'create_at'),
            update_at: _.get(entity, 'update_at')
        };
    }
};