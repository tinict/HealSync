import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: 'tbl_google_calendars' })
export class GoogleCalendarEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    calendar_id!: number;

    @Column({ type: "varchar", length: 200 })
    summary!: string;

    @Column({ type: "nvarchar", length: 255 })
    location!: string;

    @Column({ type: "nvarchar", length: 255 })
    startDateTime!: string;

    @Column({ type: "nvarchar", length: 255 })
    startTimeZone!: string;

    @Column({ type: "nvarchar", length: 255 })
    endDateTime!: string;

    @Column({ type: "nvarchar", length: 255 })
    endTimeZone!: string;
};
