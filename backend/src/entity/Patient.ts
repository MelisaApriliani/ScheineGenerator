// src/entity/Patient.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './schein/Schein';
import { PatientInsurance } from './PatientInsurance';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  firstLame: string = "";

  @Column()
  lastName: string = "";

  @Column({ type: 'date' })
  dateOfBirth ?: Date;

  @OneToMany(() => PatientInsurance, (patientInsurance) => patientInsurance.patient)
  patientInsurances: PatientInsurance[] = [];
}

export default Patient; 