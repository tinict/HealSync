import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";
import { PermissionEntity } from "./permissions.entity";
import { RoleEntity } from "./roles.entity";

@Entity({ name: 'tbl_role_permissions' })
export class RolePermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    role_permission_id!: number;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @OneToOne(() => RoleEntity)
    @JoinColumn({ name: "role_id" })
    roleEntity!: RoleEntity;

    @ManyToOne(() => PermissionEntity)
    @JoinColumn({ name: "permission_id" })
    permissionEntity!: PermissionEntity;
};
