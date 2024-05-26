import { 
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Timestamp, 
} from "typeorm";

@Entity({ name: 'tbl_integrations' })
export class IntegrationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    integration_id!: number;

    @Column({ type: "varchar", length: 200, unique: true })
    intergration_type!: string

    @Column({ type: "varchar", length: 200, unique: true })
    uri!: string
    
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_at!: Timestamp;
    
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    update_at!: Timestamp;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;
};
