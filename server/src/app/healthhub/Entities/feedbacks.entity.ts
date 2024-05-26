import {
    Entity,
    Column,
    BaseEntity,
    Timestamp,
    OneToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { DoctorEntity } from './doctors.entity';
import { CustomerEntity } from './customers.entity';

@Entity({ name: 'tbl_feedbacks' })
export class FeedbackEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    feedback_id!: number;

    @ManyToOne(() => DoctorEntity)
    @JoinColumn({ name: "doctor_id" })
    doctorEntity!: DoctorEntity;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn({ name: "customer_id" })
    customerEntity!: CustomerEntity;

    @Column({ type: "int", nullable: true})
    parent_feedback_id!: number;

    @Column({ type: "text" })
    content_feedback!: string;

    @Column({ type: "boolean", default: false })
    isRating!: boolean;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }) 
    create_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;
};
