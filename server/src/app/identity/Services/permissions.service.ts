import { injectable } from "inversify";
import {
    PermissionEntity,
    PermissionEntity as PermissionRepository
} from '../Entities';

@injectable()
export class PermissionService {
    async createPermission(model: any) {
        try {
            let permissionEntity = new PermissionEntity();
            permissionEntity.permission_name = model.permission_name;
            return await PermissionRepository.save(permissionEntity);
        } catch (error) {
            throw error;
        }
    };

    async getPermission(permission_id: number) {
        try {
            return await PermissionRepository.findOne({ where: { permission_id } });
        } catch (error) {
            throw error;
        }
    };

    async updatePermission(permission_id: number, updatedPermission: Partial<PermissionEntity>) {
        try {
            let PermissionToUpdate = await PermissionRepository.findOne({ where: { permission_id } });
            if (PermissionToUpdate) {
                Object.assign(PermissionToUpdate, updatedPermission);
                return await PermissionRepository.save(PermissionToUpdate);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async deletePermission(permission_id: number) {
        try {
            let PermissionToDelete = await PermissionRepository.findOne({ where: { permission_id } });
            if (PermissionToDelete) {
                return await PermissionRepository.remove(PermissionToDelete);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async getAllPermission() {
        try {
            return await PermissionRepository.find();
        } catch (error) {
            throw error;
        }
    };
};