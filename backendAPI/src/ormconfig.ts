import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Patient } from './entity/Patient';
import { Doctor } from './entity/Doctor';
import { PatientInsurance } from './entity/PatientInsurance';
import { InsuranceProvider } from './entity/InsuranceProvider';
import { HealthcareFacility } from './entity/HealthcareFacility';
import { HospitalTreatmentPerscriptionType } from './entity/HospitalTreatmentPerscriptionType';
import { ScheinType } from './entity/schein/ScheinType';
import { Mustersammlung} from './entity/schein/MustersammlungSchein';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Doctor,
        Patient,
        PatientInsurance,
        InsuranceProvider,
        HealthcareFacility,
        HospitalTreatmentPerscriptionType,
        ScheinType,
        Mustersammlung
    ],
    migrations: [__dirname + '/migration/*.ts'],
    synchronize: false,
});