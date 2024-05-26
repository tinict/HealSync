import {
    Entity,
    Column,
    BaseEntity,
    Timestamp,
    OneToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Gender } from '../Constants';
import { MedicalRecordEntity } from './medical-records.entity';

@Entity({ name: 'tbl_customers' })
export class CustomerEntity extends BaseEntity {
    @PrimaryColumn({ type: "nvarchar", length: 255 })
    customer_id!: string;

    @Column({ type: "nvarchar", length: 255 })
    name!: string;

    @Column({ type: "nvarchar", length: 255 })
    family_name!: string;

    @Column({ type: "nvarchar", length: 500 })
    url_picture!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    dob!: string;

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender!: Gender;

    @Column({ type: "varchar", length: 10, nullable: true })
    phone!: string;

    @Column({ type: "varchar", length: 255 })
    email!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    address!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @OneToMany(() => MedicalRecordEntity, medicalRecord => medicalRecord.doctorEntity)
    medicalRecordEntity!: MedicalRecordEntity[];
};
