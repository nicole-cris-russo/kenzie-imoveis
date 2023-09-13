import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 120, nullable: true })
  number: string;

  @Column({ length: 120 })
  city: string;

  @Column({ length: 2 })
  state: string;
}
