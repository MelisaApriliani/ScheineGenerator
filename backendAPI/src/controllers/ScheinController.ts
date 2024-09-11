import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig'; 
import { Patient } from '../entity/Patient';
import { PatientInsurance } from '../entity/PatientInsurance';
import { Doctor } from '../entity/Doctor';
import { Mustersammlung } from '../entity/schein/MustersammlungSchein';
import { HealthcareFacility } from '../entity/HealthcareFacility';
import { HospitalTreatmentPerscriptionType } from '../entity/HospitalTreatmentPerscriptionType';
import { ScheinType } from '../entity/schein/ScheinType';
import PDFKit from 'pdfkit';
import { InsuranceProvider } from '../entity/InsuranceProvider';
import { DeepPartial } from 'typeorm';

// Save mustersammlung infromation
export const createSchein = async (req: Request, res: Response) => {
    try {
        const { patient, scheinTypeId, date, doctorId, details } = req.body;

        const { firstName, lastName, dateOfBirth, insuranceNo, status, insuranceProviderId } = patient;
        const { healthCareFacilityId, diagnose, perscriptionDetails, hospitalTreatmentPerscriptionTypeId, nearestRecommendedHospitalId } = details;

        // Get repositories
        const patientRepository = AppDataSource.getRepository(Patient);
        const patientInsuranceRepository = AppDataSource.getRepository(PatientInsurance);
        const insuranceProviderRepository = AppDataSource.getRepository(InsuranceProvider);
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const scheinTypeRepository = AppDataSource.getRepository(ScheinType);
        const healthcareFacilityRepository = AppDataSource.getRepository(HealthcareFacility);
        const hospitalTreatmentPerscriptionTypeRepository = AppDataSource.getRepository(HospitalTreatmentPerscriptionType);
        const mustersammlungRepository = AppDataSource.getRepository(Mustersammlung);

        // Check if patient exists, otherwise save new patient data
        let patientEntity = await patientRepository.findOneBy({ firstName, lastName, dateOfBirth });
        if (!patientEntity) {
            patientEntity = patientRepository.create({ firstName, lastName, dateOfBirth });
            await patientRepository.save(patientEntity);
        }

        // If insuranceProviderId == 0 , meaning patient do not pay using insurance
        let patientInsuranceEntity;
        if(insuranceProviderId !== 0){
            //check if patient Insurance exists
            const foundPatientInsuranceEntity = await patientInsuranceRepository.findOneBy({ id: insuranceProviderId, patient:patientEntity });
            
            //no information on patient insurance in DB, store patient insurance information
            if (!foundPatientInsuranceEntity) {
                
                //check if insuranceProvider exists in DB
                const insuranceProvider = await insuranceProviderRepository.findOneBy({ id: insuranceProviderId });
                if (!insuranceProvider) {
                    return res.status(400).json({ error: 'Insurance Provider not found!' });
                }

                patientInsuranceEntity = patientInsuranceRepository.create({
                    patient: patientEntity,
                    insuranceProvider: insuranceProvider,
                    insuranceNo,
                    status
                });
                await patientInsuranceRepository.save(patientInsuranceEntity);

            }else{
                patientInsuranceEntity = foundPatientInsuranceEntity;
            }
        
        }

        // check if doctor exists in db
        const doctor = await doctorRepository.findOneBy({ id: doctorId });
        if (!doctor) {
            return res.status(400).json({ error: 'Doctor not found' });
        }

        // check if scheinType is valid
        const scheinTypeEntity: ScheinType | null = await scheinTypeRepository.findOneBy({ id: scheinTypeId });
        if (!scheinTypeEntity || scheinTypeEntity == null) {
            return res.status(400).json({ error: 'Schein type not found' });
        }

        // check if healthCareFacility exists in db
        const healthCareFacility = await healthcareFacilityRepository.findOneBy({ id: healthCareFacilityId });
        if (!healthCareFacility) {
            return res.status(400).json({ error: 'Healthcare facility not found' });
        }

        // check if patient need perscription for hospital treatment
        let hospitalTreatmentPerscriptionType = null;
        hospitalTreatmentPerscriptionType = await hospitalTreatmentPerscriptionTypeRepository.findOneBy({ id: hospitalTreatmentPerscriptionTypeId });
        let nearestRecommendedHospital = null;
        if (hospitalTreatmentPerscriptionType) {
            // check if nearestRecommendedHospital exists in db
            nearestRecommendedHospital = await healthcareFacilityRepository.findOneBy({ id: nearestRecommendedHospitalId });
            if (!nearestRecommendedHospital) {
                return res.status(400).json({ error: 'Nearest recommended hospital not found' });
            }
        }

        // Create Mustersammlung entry
        
            const mustersammlung = mustersammlungRepository.create({
                type: scheinTypeEntity,
                patient: patientEntity,
                patientInsurance: patientInsuranceEntity,
                doctor: doctor,
                date: new Date(date),
                healthcareFacility: healthCareFacility,
                hospitalTreatmentPerscriptionType: hospitalTreatmentPerscriptionType,
                nearestRecommendedHospital,
                perscriptionDetails,
                diagnose
            } as DeepPartial<Mustersammlung> );
        

        await mustersammlungRepository.save(mustersammlung);

        return res.status(200).json({ message: 'Successfully save schein information', data:mustersammlung});

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }      
};

export const generateScheinPDF = async (req: Request, res: Response) => {

    res.status(200).json({ error: 'Successfully generate schein.pdf' });

     // // Generate PDF
        // const doc = new PDFKit();
        // let pdfBuffer: Buffer;
        // doc.on('data', (chunk) => {
        //     pdfBuffer = chunk;
        // });
        // doc.on('end', () => {
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', 'attachment; filename="schein.pdf"');
        //     res.send(pdfBuffer);
        // });

        // doc.text('Schein Details:');
        // doc.text(`Patient: ${firstName} ${lastName}`);
        // doc.text(`Diagnosis: ${diagnose}`);
        // doc.text(`Prescription Details: ${perscriptionDetails}`);
        // doc.end();


}