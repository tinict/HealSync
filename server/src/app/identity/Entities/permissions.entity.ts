import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Timestamp,
    OneToMany,
} from "typeorm";
import { RolePermissionEntity } from './role-permissions.entity';

@Entity({ name: 'tbl_permissions' })
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    permission_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    permission_name!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;
    
    @OneToMany(() => RolePermissionEntity, rolePermissionEntity => rolePermissionEntity.permissionEntity)
    rolePermissionEntities!: RolePermissionEntity[];
};
