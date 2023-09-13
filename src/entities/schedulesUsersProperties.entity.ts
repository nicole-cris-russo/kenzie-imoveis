import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class SchedulesUsersProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, { eager: true })
  property: Properties;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
