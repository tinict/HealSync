import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Timestamp,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { ModelRoleEntity } from './model_has_roles.entity';
import { RolePermissionEntity } from './role-permissions.entity';

@Entity({ name: 'tbl_roles' })
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    role_id!: number;

    @Column({ type: "varchar", length: 50, default: true })
    role_name!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @OneToMany(() => ModelRoleEntity, modelRoleEntity => modelRoleEntity.roleEntity)
    modelRoleEntities!: ModelRoleEntity[];

    @OneToOne(() => RolePermissionEntity, rolePermissionEntity => rolePermissionEntity.roleEntity)
    rolePermisstionEntity!: RolePermissionEntity;
};
