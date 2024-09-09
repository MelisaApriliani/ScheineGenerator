// src/entity/Doctor.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './schein/Schein';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id !: number ;

  @Column()
  firstLame: string = "";

  @Column()
  lastName: string = "";

  @Column()
  specialization: string = "";

  @Column()
  licenseNumber: string = "";

  @Column()
  phoneNumber: string = "";

  @Column()
  email: string = "";

}

export default Doctor;