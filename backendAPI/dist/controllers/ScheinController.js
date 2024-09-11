"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScheinPDF = exports.createSchein = void 0;
const ormconfig_1 = require("../ormconfig"); // Import your data source configuration
const Patient_1 = require("../entity/Patient");
const PatientInsurance_1 = require("../entity/PatientInsurance");
const Doctor_1 = require("../entity/Doctor");
const MustersammlungSchein_1 = require("../entity/schein/MustersammlungSchein");
const HealthcareFacility_1 = require("../entity/HealthcareFacility");
const HospitalTreatmentPerscriptionType_1 = require("../entity/HospitalTreatmentPerscriptionType");
const ScheinType_1 = require("../entity/schein/ScheinType");
const InsuranceProvider_1 = require("../entity/InsuranceProvider");
// Create or update a patient, their insurance, and create a Mustersammlung entry
const createSchein = async (req, res) => {
    try {
        const { patient, scheinTypeId, date, doctorId, details } = req.body;
        // Destructure patient and details for easier use
        const { firstName, lastName, dateOfBirth, insuranceNo, status, insuranceProviderId } = patient;
        const { healthCareFacilityId, diagnose, perscriptionDetails, hospitalTreatmentPerscriptionTypeId, nearestRecommendedHospitalId } = details;
        // Get repositories
        const patientRepository = ormconfig_1.AppDataSource.getRepository(Patient_1.Patient);
        const patientInsuranceRepository = ormconfig_1.AppDataSource.getRepository(PatientInsurance_1.PatientInsurance);
        const insuranceProviderRepository = ormconfig_1.AppDataSource.getRepository(InsuranceProvider_1.InsuranceProvider);
        const doctorRepository = ormconfig_1.AppDataSource.getRepository(Doctor_1.Doctor);
        const scheinTypeRepository = ormconfig_1.AppDataSource.getRepository(ScheinType_1.ScheinType);
        const healthcareFacilityRepository = ormconfig_1.AppDataSource.getRepository(HealthcareFacility_1.HealthcareFacility);
        const hospitalTreatmentPerscriptionTypeRepository = ormconfig_1.AppDataSource.getRepository(HospitalTreatmentPerscriptionType_1.HospitalTreatmentPerscriptionType);
        const mustersammlungRepository = ormconfig_1.AppDataSource.getRepository(MustersammlungSchein_1.Mustersammlung);
        // Check if patient exists, otherwise save new patient data
        let patientEntity = await patientRepository.findOneBy({ firstName, lastName, dateOfBirth });
        if (!patientEntity) {
            patientEntity = patientRepository.create({ firstName, lastName, dateOfBirth });
            await patientRepository.save(patientEntity);
        }
        // If insuranceProviderId == 0 , meaning patient do not pay using insurance
        let patientInsuranceEntity = new PatientInsurance_1.PatientInsurance(insuranceProviderId);
        if (insuranceProviderId !== 0) {
            //check if patient Insurance exists
            const foundPatientInsuranceEntity = await patientInsuranceRepository.findOneBy({ id: insuranceProviderId, patient: patientEntity });
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
            }
            else {
                patientInsuranceEntity = foundPatientInsuranceEntity;
            }
        }
        // check if doctor exists in db
        const doctor = await doctorRepository.findOneBy({ id: doctorId });
        if (!doctor) {
            return res.status(400).json({ error: 'Doctor not found' });
        }
        // check if scheinType is valid
        const scheinTypeEntity = await scheinTypeRepository.findOneBy({ id: scheinTypeId });
        if (!scheinTypeEntity) {
            return res.status(400).json({ error: 'Schein type not found' });
        }
        // check if healthCareFacility exists in db
        const healthCareFacility = await healthcareFacilityRepository.findOneBy({ id: healthCareFacilityId });
        if (!healthCareFacility) {
            return res.status(400).json({ error: 'Healthcare facility not found' });
        }
        // check if hospitalTreatmentPerscriptionType exists in db
        const hospitalTreatmentPerscriptionType = await hospitalTreatmentPerscriptionTypeRepository.findOneBy({ id: hospitalTreatmentPerscriptionTypeId });
        if (!hospitalTreatmentPerscriptionType) {
            return res.status(400).json({ error: 'Hospital treatment perscription type not found' });
        }
        // check if nearestRecommendedHospital exists in db
        const nearestRecommendedHospital = await healthcareFacilityRepository.findOneBy({ id: nearestRecommendedHospitalId });
        if (!nearestRecommendedHospital) {
            return res.status(400).json({ error: 'Nearest recommended hospital not found' });
        }
        // Create Mustersammlung entry
        const mustersammlung = mustersammlungRepository.create({
            type: scheinTypeEntity,
            patient: patientEntity,
            patientInsurance: patientInsuranceEntity,
            doctor: doctor,
            date: new Date(date),
            healthcareFacility: healthCareFacility,
            hospitalTreatmentPerscriptionType,
            nearestRecommendedHospital,
            perscriptionDetails,
            diagnose
        });
        await mustersammlungRepository.save(mustersammlung);
        return res.status(200).json({ error: 'Successfully save schein information' });
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
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createSchein = createSchein;
const generateScheinPDF = async (req, res) => {
    res.status(200).json({ error: 'Successfully generate schein.pdf' });
};
exports.generateScheinPDF = generateScheinPDF;
