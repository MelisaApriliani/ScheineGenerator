// src/entity/Patient.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './Schein';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  dateOfBirth: Date = new Date();

  @OneToMany(() => Schein, schein => schein.patient)
  scheine: Schein[] = [];
}

export default Patient; 