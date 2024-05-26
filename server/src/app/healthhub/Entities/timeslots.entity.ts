import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    JoinColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { ScheduleEntity } from './schedules.entity';
import { ReExaminationScheduleEntity } from './re-examination-schedule.entity';

@Entity({ name: 'tbl_timeslot' })
export class TimeSlotEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    timeslot_id!: number; 

    @Column({ type: "int" })
    count_person!: number; 

    @Column({ type: "time" })
    starttime!: string;

    @Column({ type: "time" })
    endtime!: string;

    @Column({ type: "bigint" })
    cost!: number;

    @Column({ type: "nvarchar", length: 500 })
    localtion!: string;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @ManyToOne(() => ScheduleEntity)
    @JoinColumn({ name: "schedule_id" })
    scheduleEntity!: ScheduleEntity;

    @OneToMany(() => ReExaminationScheduleEntity, reExaminationScheduleEntity => reExaminationScheduleEntity.timeSlotEntity)
    reExaminationScheduleEntity!: ReExaminationScheduleEntity[];
};
