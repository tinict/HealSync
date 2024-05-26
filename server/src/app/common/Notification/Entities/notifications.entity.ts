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
import { AccountEntity } from "./account.entity";

@Entity({ name: 'tbl_notifications' })
export class NotificationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    notification_id!: number;

    @Column({ type: "text" })
    message!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "boolean", default: false })
    read!: boolean;

    @ManyToOne(() => AccountEntity)
    @JoinColumn({ name: "identity_id" })
    accountEntity!: AccountEntity;
};
