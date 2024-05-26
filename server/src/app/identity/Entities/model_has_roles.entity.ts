import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";
import { ModelEntity } from "./models.entity";
import { RoleEntity } from './roles.entity';

@Entity({ name: 'tbl_model_has_roles' })
export class ModelRoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @OneToOne(() => ModelEntity)
    @JoinColumn({ name: "model_id" })
    modelEntity!: ModelEntity;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: "role_id" })
    roleEntity!: RoleEntity;
};
