import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../Patient';
import { Doctor } from '../Doctor';
import { ScheinType } from './ScheinType';

export abstract class Schein {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ScheinType, { nullable: false })
  @JoinColumn({ name: 'schein_type_id' })
  type!: ScheinType;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor;

  @Column({ type: 'date', nullable: false })
  date: Date = new Date();
}