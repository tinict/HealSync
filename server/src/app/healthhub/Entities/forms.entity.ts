import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    Timestamp, 
    OneToOne, 
    OneToMany, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm';
import { DoctorEntity } from './doctors.entity';

@Entity({ name: 'tbl_forms' })
export class FormEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    increment_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    form_id!: string;

    @Column({ type: "varchar", length: 200 })
    formname!: string;

    @Column({ type: "varchar", length: 200, unique: true })
    filepath!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => DoctorEntity)
    @JoinColumn({ name: "doctor_id" })
    doctorEntity!: DoctorEntity;
};
