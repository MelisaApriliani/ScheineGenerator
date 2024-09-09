import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './schein/Schein';

@Entity()
export class HealthcareFacility {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name: string = "";

  @Column()
  address: string = "";

  @Column()
  healthcareFacilityNumber: string = "";

}