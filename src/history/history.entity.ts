import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";


@Entity('history')
export class History extends AuditEntity{

  @PrimaryGeneratedColumn()
    id: number;
   @Column()
    fullName: string;
  @Column()
    mssv: string;
  @Column()
  class: string;
  @Column()
  gender: string;
  @Column()
  height: string;
  @Column()
  weight: string;
}