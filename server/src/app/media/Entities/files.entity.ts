import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
} from "typeorm";

@Entity({ name: 'tbl_files' })
export class FileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    file_id!: string;

    @Column({ type: "varchar", length: 200 })
    user_id!: string;

    @Column({ type: "varchar", length: 200 })
    file_name!: string;

    @Column({ type: "varchar", length: 200, unique: true })
    file_path!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;
};
