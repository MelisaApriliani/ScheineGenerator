import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Doctor } from './entity/Doctor';
import { Patient } from './entity/Patient';
import { PatientInsurance } from './entity/PatientInsurance';
import { InsuranceProvider } from './entity/InsuranceProvider';
import { HealthcareFacility} from './entity/HealthcareFacility';
import { HospitalTreatmentPerscriptionType} from './entity/HospitalTreatmentPerscriptionType';
import { Schein} from './entity/schein/Schein';
import { ScheinType} from './entity/schein/ScheinType';
import { Mustersammlung} from './entity/schein/MustersammlungSchein';




// Load environment variables from .env file
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Doctor, 
    Patient, 
    PatientInsurance,
    InsuranceProvider,
    HealthcareFacility,
    HospitalTreatmentPerscriptionType,
    Schein,
    Mustersammlung,
    ScheinType],
  migrations: ['src/migration/**/*.ts'],
  
});

export default dataSource;