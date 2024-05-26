import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";

@Entity({ name: 'tbl_google_accounts' })
export class GoogleAccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    google_id!: string;

    @Column({ type: "nvarchar", length: 255 })
    name!: string;

    @Column({ type: "nvarchar", length: 255 })
    family_name!: string;

    @Column({ type: "nvarchar", length: 500 })
    url_picture!: string;

    @Column({ type: "varchar", length: 500 })
    access_token!: string;

    @Column({ type: "nvarchar", length: 255 })
    email!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;
};
