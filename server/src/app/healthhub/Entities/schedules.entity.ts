import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, BaseEntity, 
    Timestamp, 
    OneToOne, 
    OneToMany, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm';
import { DoctorEntity } from './doctors.entity';
import { TypeSchedule } from '../Constants';

@Entity({ name: 'tbl_schedules' })
export class ScheduleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    schedule_id!: number;

    @Column("date")
    datework!: Date;

    @ManyToOne(() => DoctorEntity, { cascade: true })
    @JoinColumn({ name: "doctor_id" })
    doctorEntity!: DoctorEntity;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "enum", enum: TypeSchedule })
    typeSchedule!: TypeSchedule;
};
