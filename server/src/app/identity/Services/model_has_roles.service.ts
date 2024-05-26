import { injectable } from "inversify";
import {
    ModelRoleEntity,
    RoleEntity,
    RoleEntity as RoleRepository,
    ModelRoleEntity as ModelRoleRepository
} from '../Entities';
import { IAModel } from "../Models";

@injectable()
export class ModelRoleService {

    constructor(){};

    async createModelRole(modelRole: any) {
        try {
            const newModelRole = new ModelRoleEntity();

            newModelRole.modelEntity = modelRole.newModelEntity;

            const roleEntity = await RoleRepository.findOne({ where: { role_id: modelRole.role_id } });

            if(!roleEntity) return;

            newModelRole.roleEntity = roleEntity;

            return await ModelRoleRepository.save(newModelRole);
        } catch (error) {
            throw error;
        }
    };

    async getModelRole(increment_id: number) {
        try {
            return await ModelRoleRepository.findOne({ where: { increment_id } });
        } catch (error) {
            throw error;
        }
    };

    async updateModelRole(increment_id: number, updatedModelRole: Partial<ModelRoleEntity>) {
        try {
            let modelRoleToUpdate = await ModelRoleRepository.findOne({ where: { increment_id } });
            if (modelRoleToUpdate) {
                Object.assign(modelRoleToUpdate, updatedModelRole);
                return await ModelRoleRepository.save(modelRoleToUpdate);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async deleteModelRole(increment_id: number) {
        try {
            let modelRoleToDelete = await ModelRoleRepository.findOne({ where: { increment_id } });
            if (modelRoleToDelete) {
                return await ModelRoleRepository.remove(modelRoleToDelete);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
};
