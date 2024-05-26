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

@Entity({ name: 'tbl_accounts' })
export class AccountEntity extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 200 })
    identity_id!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;
};
