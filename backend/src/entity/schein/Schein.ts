import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, TableInheritance } from 'typeorm';
import { Patient } from '../Patient';
import { Doctor } from '../Doctor';
import { HealthcareFacility } from '../HealthcareFacility';
import { PatientInsurance } from '../PatientInsurance';
import { ScheinType } from './ScheinType';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Schein {
  @PrimaryGeneratedColumn()
  id !: number;

  @ManyToOne(() => ScheinType, { nullable: false })
  @JoinColumn({ name: 'schein_type_id' })
  type !: ScheinType;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient : Patient = new Patient();

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor = new Doctor();

  @Column({ nullable: true })
  date : Date = new Date();


}