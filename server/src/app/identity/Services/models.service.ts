import { inject, injectable } from "inversify";
import {
    ModelEntity,
    ModelEntity as ModelRepository
} from '../Entities';
import { TYPES } from "../Database/types";
import { ModelRoleService } from "./model_has_roles.service";
import { ModelRoleMapper } from "../Mappers";

@injectable()
export class ModelService {

    private modelRoleService: ModelRoleService;

    constructor(
        @inject(TYPES.ModelRoleService)
        modelRoleService: ModelRoleService,
    ) {
        this.modelRoleService = modelRoleService
    };

    async createModel(model: any) {
        try {
            let newModelEntity = new ModelRepository();

            newModelEntity.model_type = model.model_type;

            newModelEntity = await ModelRepository.save(model);

            await this.modelRoleService.createModelRole({ newModelEntity, ...model });

            return newModelEntity;
        } catch (error) {
            throw error;
        }
    };

    async getModel(model_id: number) {
        try {
            return await ModelRepository.findOne({ where: { model_id } });
        } catch (error) {
            throw error;
        }
    };

    async getAllModel() {
        try {
            const models = await ModelRepository
                .createQueryBuilder("tbl_models")
                .leftJoinAndSelect("tbl_models.modelRoleEntity", "tbl_model_has_roles")
                .leftJoinAndSelect("tbl_model_has_roles.roleEntity", "tbl_roles")
                .getMany();

            let result: any[] = [];

            console.log(models);

            models.forEach((model: any) => {
                result.push(
                    ModelRoleMapper.toModelRole({
                        ...model,
                        ...model.modelRoleEntity,
                        ...model.modelRoleEntity.roleEntity
                    })
                );
            });

            return result;
        } catch (error) {
            throw error;
        }
    };

    async updateModel(model_id: number, updatedModel: Partial<ModelEntity>) {
        try {
            let modelToUpdate = await ModelRepository.findOne({ where: { model_id } });
            if (modelToUpdate) {
                Object.assign(modelToUpdate, updatedModel);
                return await ModelRepository.save(modelToUpdate);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async deleteModel(model_id: number) {
        try {
            let modelToDelete = await ModelRepository.findOne({ where: { model_id } });
            if (modelToDelete) {
                return await ModelRepository.remove(modelToDelete);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
};