// src/entity/Doctor.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id !: number ;

  @Column()
  firstName: string = "";

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