import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity,
    Timestamp,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';
import { Gender } from '../Constants';
import { ScheduleEntity } from './schedules.entity';

@Entity({ name: 'tbl_doctors' })
export class DoctorEntity extends BaseEntity {
    @PrimaryColumn({ type: "nvarchar", length: 255 })
    doctor_id!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 10, unique: true })
    phone!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    firstname!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    lastname!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    dob!: string;

    @Column({ type: "varchar", length: 12, nullable: true })
    idCardNumber!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    address!: string;

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender!: Gender;

    @Column({ type: "nvarchar", length: 500, nullable: true })
    url_picture!: string;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    specialty!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    qualification!: string;

    @Column({ type: "nvarchar", length: 100, nullable: true })
    position!: string;

    @Column({ type: "nvarchar", length: 100, nullable: true })
    degree!: string;

    @Column({ type: "nvarchar", length: 100, nullable: true })
    workspace!: string;

    @Column({ type: "text", nullable: true })
    experience!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    location!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @OneToMany(() => ScheduleEntity, schedule => schedule.doctorEntity)
    schedules!: ScheduleEntity[];
};
