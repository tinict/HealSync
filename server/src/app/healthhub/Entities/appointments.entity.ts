import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Timestamp,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { TimeSlotEntity } from './timeslots.entity';
import { CustomerEntity } from './customers.entity';
import { StatusAppointment } from '../Constants';
import { ExaminationRecordEntity } from './examination-records.entity';
import { ReExaminationScheduleEntity } from './re-examination-schedule.entity';
import { MedicalRecordEntity } from './medical-records.entity';

@Entity({ name: 'tbl_appointments' })
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    appointment_id!: number;

    @ManyToOne(() => TimeSlotEntity)
    @JoinColumn({ name: "timeslot_id" })
    timeSlotEntity!: TimeSlotEntity;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn({ name: "customer_id" })
    customerEntity!: CustomerEntity;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "enum", enum: StatusAppointment, default: StatusAppointment.pending })
    status_appointment!: StatusAppointment;

    @Column({ type: "varchar", length: 255, default: null })
    meetLink!: string;

    @Column({ type: "int", default: () => 0 })
    ordinalNumber!: number;

    @OneToOne(() => ExaminationRecordEntity, examinationRecord => examinationRecord.appointmentEntity)
    examinationRecordEntity!: ExaminationRecordEntity;

    @OneToOne(() => ReExaminationScheduleEntity, reExaminationScheduleEntity => reExaminationScheduleEntity.appointmentEntity)
    reExaminationScheduleEntity!: ReExaminationScheduleEntity;

    @OneToMany(() => MedicalRecordEntity, medicalRecord => medicalRecord.appointmentEntity)
    medicalRecordEntity!: MedicalRecordEntity[];
};
