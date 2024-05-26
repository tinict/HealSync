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
import {
    ReExaminationSchedule,
    StatusAppointment
} from '../Constants';
import { AppointmentEntity } from './appointments.entity';

@Entity({ name: 'tbl_re-examination-schedules' })
export class ReExaminationScheduleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @OneToOne(() => AppointmentEntity)
    @JoinColumn({ name: "appointment_id" })
    appointmentEntity!: AppointmentEntity;

    @ManyToOne(() => TimeSlotEntity, { nullable: true })
    @JoinColumn({ name: "timeslot_id" })
    timeSlotEntity!: TimeSlotEntity;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    startDay!: Timestamp;

    @Column({ type: "timestamp" })
    endDay!: Timestamp;

    @Column({ type: "enum", enum: ReExaminationSchedule, default: ReExaminationSchedule.processing_calendar })
    status!: ReExaminationSchedule;

    @Column({ type: "int", default: () => 0 })
    ordinalNumber!: number;
};
