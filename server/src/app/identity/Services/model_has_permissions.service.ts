import { inject, injectable } from "inversify";
import {
    ModelRoleEntity,
    RoleEntity,
    ModelEntity as ModelRepository,
    RoleEntity as RoleRepository,
    ModelRoleEntity as ModelRoleRepository,
    PermissionEntity as PermissionRepository,
    ModelPermissionEntity as ModelPermissionRepository,
    IntegrationEntity as IntegrationRepository
} from '../Entities';
import { TYPES } from "../Database/types";
import { AccountService } from "./accounts.service";
import { 
    ModelPermissionMapper, 
    ModelIntegrationMapper
} from "../Mappers";
import { ModelRoleService } from "./model_has_roles.service";

@injectable()
export class ModelPermissionService {
    private accountService: AccountService;

    constructor(
        @inject(TYPES.AccountService)
        accountService: AccountService
    ) {
        this.accountService = accountService
    };

    isExistStringInString(str1: string, str2: string) {
        const string1 = str1.split('');
        const string2 = str2.split('');

        return string1.every(char => string2.includes(char));
    };

    async createModelPermission(modelPermissionModel: any) {
        try {
            const iam = await this.getModelPermission(modelPermissionModel.model_id);
            console.log(iam);

            const permission = await PermissionRepository.findOne({ where: { permission_id: Number(modelPermissionModel.permission_id) } });

            if (!permission) return new Error('Permission not found');
            const isAccess = this.isExistStringInString(permission.permission_name, iam.permission_name);

            if (!isAccess) return new Error('Permission denied');

            const model = await ModelRepository.findOne({ where: { model_id: iam.model_id } });
            const integration = await IntegrationRepository.findOne({ where: { integration_id: Number(modelPermissionModel.integration_id) } });

            if (!model) return new Error('Model not found');
            if (!integration) return new Error('Intergration not found');

            let modelPermission = new ModelPermissionRepository();

            modelPermission.modelEntity = model;
            modelPermission.permissionEntity = permission;
            modelPermission.integrationEntity = integration;

            modelPermission = await ModelPermissionRepository.save(modelPermission);
            return modelPermission;
        } catch (error) {
            throw error;
        }
    };

    async getModelPermission(model_id: number) {
        try {
            const modelPermission = await ModelRepository
                .createQueryBuilder("tbl_models")
                .leftJoinAndSelect("tbl_models.modelRoleEntity", "tbl_model_has_roles")
                .leftJoinAndSelect("tbl_model_has_roles.roleEntity", "tbl_roles")
                .leftJoinAndSelect("tbl_roles.rolePermisstionEntity", "tbl_role_permissions")
                .leftJoinAndSelect("tbl_role_permissions.permissionEntity", "tbl_permissions")
                .where("tbl_models.model_id = :model_id",
                    {
                        model_id
                    }
                )
                .getOne();

            return ModelPermissionMapper.toModelPermission({
                ...modelPermission,
                ...modelPermission?.modelRoleEntity,
                ...modelPermission?.modelRoleEntity.roleEntity,
                ...modelPermission?.modelRoleEntity.roleEntity.rolePermisstionEntity,
                ...modelPermission?.modelRoleEntity.roleEntity.rolePermisstionEntity.permissionEntity
            })
        } catch (error) {
            throw error;
        }
    };

    async getAllModelPermissionIntegration() {
        try {
            const modelPermissionIntegrations = await ModelRepository
                .createQueryBuilder("tbl_models")
                .leftJoinAndSelect("tbl_models.modelPermisionEntities", "tbl_model_has_permissions")
                .leftJoinAndSelect("tbl_model_has_permissions.permissionEntity", "tbl_permissions")
                .leftJoinAndSelect("tbl_model_has_permissions.integrationEntity", "tbl_integrations")
                .getMany();

            console.log(modelPermissionIntegrations);

            let result: any[] = [];

            modelPermissionIntegrations.forEach((modelPermissionIntegration: any) => {
                result.push(
                    ModelIntegrationMapper.toModelIntegration ({
                        ...modelPermissionIntegration,
                        ...modelPermissionIntegration.modelPermisionEntities,
                        ...modelPermissionIntegration.modelPermisionEntities.permissionEntity,
                        ...modelPermissionIntegration.modelPermisionEntities.integrationEntity
                    })
                );
            });

            return result;
        } catch (error) {
            throw error;
        }
    };
};