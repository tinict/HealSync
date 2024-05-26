import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    Timestamp, OneToOne,
    JoinColumn 
} from 'typeorm';
import { AccountEntity } from './accounts.entity';

@Entity({ name: 'tbl_credentials' })
export class CredentialEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    credential_id!: number;

    @Column("varchar", { length: 250 })
    password_hash!: string;

    @Column("varchar", { length: 250 })
    password_salt!: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @OneToOne(() => AccountEntity, { cascade: true })
    @JoinColumn({ name: "account_id" })
    accountEntity!: AccountEntity;
};
