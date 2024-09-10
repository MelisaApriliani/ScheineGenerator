import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PatientInsurance } from './PatientInsurance';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  firstName: string = "";

  @Column()
  lastName: string = "";

  @Column({ type: 'date' })
  dateOfBirth ?: Date;

  @OneToMany(() => PatientInsurance, (patientInsurance) => patientInsurance.patient)
  patientInsurances?: PatientInsurance[];
}

export default Patient; 