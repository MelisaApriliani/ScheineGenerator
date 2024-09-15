import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './Patient';
import { InsuranceProvider } from './InsuranceProvider';

@Entity()
export class PatientInsurance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Patient, (patient) => patient.patientInsurances)
  @JoinColumn({ name: 'patient_id' })
  patient !: Patient;

  @ManyToOne(() => InsuranceProvider, { nullable: true })
  @JoinColumn({ name: 'insurance_provider_id' })
  insuranceProvider !: InsuranceProvider;

  @Column()
  insuranceNo: string = ""; // Insurance number

  @Column({ nullable: true })
  status: string = ""; // Insurance status (e.g., active, inactive)

  constructor(id:number) {
    this.id = id;
  }
}