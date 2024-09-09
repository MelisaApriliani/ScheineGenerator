
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor"

@Entity()
export class Schein {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  type: string = ''; // e.g., AU, Überweisung, Rezept

  @Column()
  diagnosis: string = '';

  @ManyToOne(() => Patient, patient => patient.scheine)
  patient: Patient = new Patient();

  @ManyToOne(() => Doctor, doctor => doctor.scheine)
  doctor: Doctor = new Doctor();
}