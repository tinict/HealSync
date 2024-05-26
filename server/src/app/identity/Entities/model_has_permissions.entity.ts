import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";
import { ModelEntity } from "./models.entity";
import { PermissionEntity } from "./permissions.entity";
import { IntegrationEntity } from "./integrations.entity";

@Entity({ name: 'tbl_model_has_permissions' })
export class ModelPermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @ManyToOne(() => ModelEntity)
    @JoinColumn({ name: "model_id" })
    modelEntity!: ModelEntity;

    @ManyToOne(() => PermissionEntity)
    @JoinColumn({ name: "permission_id" })
    permissionEntity!: PermissionEntity;

    @ManyToOne(() => IntegrationEntity)
    @JoinColumn({ name: "integration_id" })
    integrationEntity!: IntegrationEntity;
};