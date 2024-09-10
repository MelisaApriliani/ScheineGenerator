import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class InsuranceProvider {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name!: string ;

  @Column()
  insuranceIdentificationNumber!: string; // Identifier for billing purposes

}