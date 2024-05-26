import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Timestamp
} from "typeorm";
import { TransactionEntity } from "./transactions.entity";

@Entity({ name: 'tbl_invoices' })
export class InvoiceEntity extends BaseEntity {
    @PrimaryColumn({ type: "nvarchar", length: 255 })
    invoice_code!: string;

    @Column({ type: "int" })
    amount!: number;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    invoice_date!: Date;

    @Column({ type: "timestamp", nullable: true })
    due_date!: Date;

    @Column({ type: "varchar", length: 255, default: () => "'Processing'" })
    status!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    message_log!: string;

    @OneToOne(() => TransactionEntity, { cascade: true })
    @JoinColumn({ name: "transaction_id" })
    transactionEntity!: TransactionEntity;
};
