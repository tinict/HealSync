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
import { 
    RefundStatus, 
} from '../Constants';
import { InvoiceEntity } from './invoices.entity';

@Entity({ name: 'tbl_refunds' })
export class RefundEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    refund_id!: number;

    @ManyToOne(() => InvoiceEntity)
    @JoinColumn({ name: "invoice_id" })
    invoiceEntity!: InvoiceEntity;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Timestamp;

    @Column({ type: "enum", enum: RefundStatus, default: RefundStatus.pending })
    status!: RefundStatus;
};
