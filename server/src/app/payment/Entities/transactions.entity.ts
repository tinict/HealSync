import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Timestamp
} from "typeorm";

@Entity({ name: 'tbl_transactions' })
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    transaction_id!: number;

    @Column({ type: "nvarchar", length: 255 })
    user_id!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    card_type!: string;

    @Column({ type: "datetime" })
    transaction_date!: Date;
    
    @Column({ type: "varchar", length: 500, nullable: true })
    transaction_status!: string;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    transaction_code!: string;
};
