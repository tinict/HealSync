import { injectable } from "inversify";
import {
    RolePermissionEntity,
    RolePermissionEntity as RolePermissionRepository,
    RoleEntity as RoleRepository,
    RoleEntity,
    PermissionEntity as PermissionRepository,
} from '../Entities';
import { RolePermissionMapper } from "../Mappers";

@injectable()
export class RolePermissionService {
    constructor() { };

    async createRolePermission(modelRolePermission: any) {
        try {
            let rolePermission = new RolePermissionEntity();

            console.log(modelRolePermission);

            const roleEntity = await RoleRepository.findOne({ where: { role_id: modelRolePermission.role_id } });
            const permissionEntity = await PermissionRepository.findOne({ where: { permission_id: Number(modelRolePermission.permission_id) } });

            console.log(roleEntity, permissionEntity);
            if (!roleEntity || !permissionEntity) return;

            rolePermission.roleEntity = roleEntity;
            rolePermission.permissionEntity = permissionEntity;

            return await RolePermissionRepository.save(rolePermission);
        } catch (error) {
            throw error;
        }
    };

    async getAllPermissionRole() {
        try {
            const permissionRoles = await RoleRepository
                .createQueryBuilder("tbl_roles")
                .leftJoinAndSelect("tbl_roles.rolePermisstionEntity", "tbl_role_permissions")
                .leftJoinAndSelect("tbl_role_permissions.permissionEntity", "tbl_permissions")
                .getMany();

            let result: any[] = [];

            console.log(permissionRoles);

            permissionRoles.forEach((permissionRole: any, index: number) => {
                result.push(
                    // RolePermissionMapper.toRolePermission({
                    //     ...permissionRole,
                    //     ...permissionRole.rolePermisstionEntity.permissionEntity[index]
                    // })
                    {
                        ...permissionRole,
                        ...permissionRole.rolePermisstionEntity.permissionEntity[index]
                    }
                );
            });

            return result;
        } catch (error) {
            throw error;
        }
    };
};
