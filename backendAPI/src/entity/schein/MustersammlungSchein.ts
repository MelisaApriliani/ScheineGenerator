import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Schein } from './Schein';
import { HospitalTreatmentPerscriptionType } from '../HospitalTreatmentPerscriptionType';
import { PatientInsurance } from '../PatientInsurance';
import { HealthcareFacility } from '../HealthcareFacility';

@Entity()
export class Mustersammlung extends Schein {
  @ManyToOne(() => PatientInsurance)
  @JoinColumn({ name: 'patient_insurance_id' })
  patientInsurance?: PatientInsurance;

  @ManyToOne(() => HealthcareFacility, { nullable: true })
  @JoinColumn({ name: 'healthcare_facility_id' })
  healthcareFacility!: HealthcareFacility;

  @ManyToOne(() => HospitalTreatmentPerscriptionType)
  @JoinColumn({ name: 'hospital_treatment_type_id' })
  hospitalTreatmentPerscriptionType?: HospitalTreatmentPerscriptionType;

  @ManyToOne(() => HealthcareFacility, { nullable: true })
  @JoinColumn({ name: 'recommended_hospital_id' })
  nearestRecommendedHospital?: HealthcareFacility;

  @Column({ nullable: true })
  perscriptionDetails?: string;

  @Column({ nullable: true })
  diagnose?: string;
}