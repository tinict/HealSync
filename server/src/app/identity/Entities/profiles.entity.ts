import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    Timestamp,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { AccountEntity } from './accounts.entity';

@Entity({ name: 'tbl_profiles' })
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    profile_id!: number;

    @Column({ type: "nvarchar", length: 255 })
    firstname!: string;

    @Column({ type: "nvarchar", length: 255 })
    lastname!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 10, unique: true, nullable: true })
    phone!: string;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    address!: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    url_picture!: string;
    
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @OneToOne(() => AccountEntity)
    @JoinColumn({ name: "account_id" })
    accountEntity!: AccountEntity;
};
