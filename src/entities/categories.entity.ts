import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @OneToMany(() => Properties, (props) => props.category)
  properties: Properties[];
}
