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
import { ModelEntity } from "./models.entity";
import { ProfileEntity } from "./profiles.entity";

@Entity({ name: 'tbl_accounts' })
export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    account_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    identity_id!: string;

    @Column({ type: "varchar", length: 200, unique: true })
    username!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @ManyToOne(() => ModelEntity)
    @JoinColumn({ name: "model_id" })
    modelEntity!: ModelEntity;

    @OneToOne(() => ProfileEntity, profileEntity =>  profileEntity.accountEntity)
    profileEntity!: ProfileEntity;
};
