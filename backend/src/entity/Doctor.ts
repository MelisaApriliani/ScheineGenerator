// src/entity/Doctor.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './Schein';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  specialization: string = "";

  @Column()
  licenseNumber: string = "";

  @Column()
  phoneNumber: string = "";

  @Column()
  email: string = "";

  @OneToMany(() => Schein, schein => schein.doctor)
  scheine: Schein[] = [];
}

export default Doctor;