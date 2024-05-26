import {
    Entity,
    Column,
    BaseEntity,
    Timestamp,
    OneToOne,
    OneToMany,
    PrimaryColumn,
    ManyToMany,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { CustomerEntity } from './customers.entity';
import { AppointmentEntity } from './appointments.entity';
import { RefundEntity } from './refunds.entity';

@Entity({ name: 'tbl_invoices' })
export class InvoiceEntity extends BaseEntity {
    @PrimaryColumn({ type: "nvarchar", length: 255 })
    invoice_id!: string;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn({ name: "customer_id" })
    customerEntity!: CustomerEntity;

    @ManyToOne(() => AppointmentEntity)
    @JoinColumn({ name: "appointment_id" })
    appointmentEntity!: AppointmentEntity;

    @Column({ type: "varchar", length: 255, default: () => "'Processing'" })
    status!: string;

    @Column({ type: "timestamp" })
    create_at!: Timestamp;

    @Column({ type: "timestamp", nullable: true})
    due_at!: Timestamp;

    @OneToMany(() => RefundEntity, refund => refund.invoiceEntity)
    refunds!: RefundEntity[]
};
