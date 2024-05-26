import { Gender } from '../Constants/enum';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AppointmentEntity } from './appointments.entity';

@Entity({ name: 'tbl_examination_records' })
export class ExaminationRecordEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    examination_record_id!: number;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    firstname!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    lastname!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    email!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    phone!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    dob!: string;

    @Column({ type: "enum", enum: Gender })
    gender!: Gender;

    @Column({ type: "nvarchar", length: 255 })
    nation!: string;

    @Column({ type: "nvarchar", length: 255 })
    career!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    address!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    guardianName!: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    guardian_phone_number!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    medicalHistory!: string;

    @Column({ type: "text", nullable: true })
    reasonForConsultation!: string;

    @Column({ type: "text", nullable: true })
    idCardNumber!: string;

    @OneToOne(() => AppointmentEntity)
    @JoinColumn({ name: "appointment_id" })
    appointmentEntity!: AppointmentEntity;
};
