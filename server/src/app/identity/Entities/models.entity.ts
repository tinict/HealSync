import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";
import { ModelRoleEntity } from "./model_has_roles.entity";
import { ModelPermissionEntity } from "./model_has_permissions.entity";

@Entity({ name: 'tbl_models' })
export class ModelEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    model_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    model_type!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @OneToOne(() => ModelRoleEntity, modelroleEntity => modelroleEntity.modelEntity)
    modelRoleEntity!: ModelRoleEntity;

    @OneToMany(() => ModelPermissionEntity, modelPermissionEntity => modelPermissionEntity.modelEntity)
    modelPermisionEntities!: ModelPermissionEntity[];
};
