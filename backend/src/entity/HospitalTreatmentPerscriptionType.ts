import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class HospitalTreatmentPerscriptionType {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string; // e.g., 'Attending Doctor Treatment'
  
}