import { AppDataSource } from '../ormconfig'; 
import { Request, Response } from 'express';
import { PDFDocument, rgb, PDFFont, PDFPage, StandardFonts } from 'pdf-lib';
import { DeepPartial } from 'typeorm';
import { Mustersammlung } from '../entity/schein/MustersammlungSchein';
import { InsuranceProvider } from '../entity/InsuranceProvider';
import { Patient } from '../entity/Patient';
import { Doctor } from '../entity/Doctor';
import { HealthcareFacility } from '../entity/HealthcareFacility';
import { PatientInsurance } from '../entity/PatientInsurance';
import { ScheinType } from '../entity/schein/ScheinType';
import { HospitalTreatmentPerscriptionType } from '../entity/HospitalTreatmentPerscriptionType';

import fs from 'fs';
import fontkit from 'fontkit';
import path from 'path';

export const createSchein = async (data: any) => {

    console.log("Begin Save Schein information for scheinId:" );
    const { patient, scheinTypeId, date, doctorId, details } = data;

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

    // check if scheinType is valid
    const scheinTypeEntity: ScheinType | null = await scheinTypeRepository.findOneBy({ id: scheinTypeId });
    if (!scheinTypeEntity || scheinTypeEntity == null) {
        return {status: 400, message: 'Schein type not found', data: null};
    }

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
                return {status: 400, message: 'Insurance Provider not found!', data: null};
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
        return {status: 400, message: 'Doctor not found!', data: null};
    }

    // check if healthCareFacility exists in db
    const healthCareFacility = await healthcareFacilityRepository.findOneBy({ id: healthCareFacilityId });
    if (!healthCareFacility) {
        return {status: 400, message: 'Healthcare facility not found', data: null};
    }

    // check if patient need perscription for hospital treatment
    let hospitalTreatmentPerscriptionType = null;
    hospitalTreatmentPerscriptionType = await hospitalTreatmentPerscriptionTypeRepository.findOneBy({ id: hospitalTreatmentPerscriptionTypeId });
    let nearestRecommendedHospital = null;
    if (hospitalTreatmentPerscriptionType) {
        // check if nearestRecommendedHospital exists in db
        nearestRecommendedHospital = await healthcareFacilityRepository.findOneBy({ id: nearestRecommendedHospitalId });
        if (!nearestRecommendedHospital) {
            return {status: 400, message: 'Nearest recommended hospital not found!', data: null};
        }
    }

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

    return {status: 200, message: 'Successfully save schein information.', data: mustersammlung};


    
};

export const generatePdf = async (scheinId: number) => {

    console.log("Begin Generate PDF for scheinId:" + scheinId);
    const scheinRepository = AppDataSource.getRepository(Mustersammlung);
    const schein = await scheinRepository.findOne({ 
        where: { id: Number(scheinId) }, 
        relations: ['type', 'patient', 'doctor', 'patientInsurance','patientInsurance.insuranceProvider', 'healthcareFacility', 'hospitalTreatmentPerscriptionType', 'nearestRecommendedHospital']
    });
    if (!schein) {
        throw new Error('Schein not found');
    }
    
    try {
        // Load the PDF template
        const templatePath = path.join(__dirname, '../../pdf_template/Mustersammlung.pdf');
        const templateBytes = fs.readFileSync(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);
        pdfDoc.registerFontkit(fontkit);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        console.log(`mustersammlung:` + JSON.stringify(schein, null, 2));

        // Flatten all form fields
        const form = pdfDoc.getForm();
        form.flatten();

        const page = pdfDoc.getPages()[0];
        const { width, height } = page.getSize();  // This will give you the page dimensions
        console.log(`Page width: ${width}, Page height: ${height}`);

        const rotation = page.getRotation().angle;  // Get page rotation angle
        console.log(`Page rotation: ${rotation}`);

        let size = 12;
       
        page.drawText(`${schein.patient.firstName}, ${schein.patient.lastName}`, {x: 28.5,  y: 228,font:helveticaFont,  size, color: rgb(0, 0, 0),});
        page.drawText(`${schein.patient.dateOfBirth}`, {x:185,y:210,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.healthcareFacility.healthcareFacilityNumber}`, {x:28.5,y:155,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.doctor.licenseNumber}`, {x:108,y:155,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.date}`, {x:185,y:155,size,color: rgb(0, 0, 0),});

        console.log(`patientInsurance:` + JSON.stringify(schein.patientInsurance, null, 2));

        if(schein.patientInsurance && schein.patientInsurance?.id >0){
            const insuranceProvider = schein.patientInsurance.insuranceProvider;
            if(insuranceProvider && insuranceProvider !== null){
                console.log(`insurance provider:` + insuranceProvider.id+ ' '+insuranceProvider.insuranceIdentificationNumber);
                page.drawText(`${insuranceProvider.name}`, {x:28.5,y:260,size,color: rgb(0, 0, 0),});
                page.drawText(`${insuranceProvider.insuranceIdentificationNumber}`, {x:28.5,y:181,size,color: rgb(0, 0, 0),});

                page.drawText(`${schein.patientInsurance?.insuranceNo}`, {x:108,y:181,size,color: rgb(0, 0, 0),});
                page.drawText(`${schein.patientInsurance?.status}`, {x:203,y:181,size,color: rgb(0, 0, 0),});
            }
        }else{
            page.drawText(`Self Payment`, {x:28.5,y:260,size,color: rgb(0, 0, 0),});
        }

        if (schein.diagnose){
            drawWrappedText(page, schein.diagnose, 28.5, 116,230,127.6,helveticaFont,size)
        }
        

        // Add custom font to support drawing checkmark
        const fontBytes = fs.readFileSync(path.join(__dirname, '../../font/DejaVuSans.ttf'));
        const customFont = await pdfDoc.embedFont(fontBytes);
        const checkmark = '\u2714';
        switch(schein.hospitalTreatmentPerscriptionType?.id){
            case 1:
                page.drawText(checkmark, {x: 265, y: 225,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            case 2:
                page.drawText(checkmark, {x: 265, y: 204,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            case 3:
                page.drawText(checkmark, {x: 340, y: 225,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            case 4:
                page.drawText(checkmark, {x: 340, y: 204,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            default:   
                break;
        }

        if(schein.nearestRecommendedHospital){
            console.log(`nearest hospital:` + schein.nearestRecommendedHospital.name);
            page.drawText(`${schein.nearestRecommendedHospital.name}`, {x:267,y:180,size,color: rgb(0, 0, 0),});
        }

        const pdfBytes = await pdfDoc.save();

        console.log("PDF generated successfully, pdf length in bytes:", pdfBytes.length); 

        return pdfBytes;
    }catch(error){
        console.error('Error generating PDF:', error);

    }

    async function drawWrappedText(page: PDFPage, text: string, x: number, y: number,
        maxWidth: number, maxHeight: number, font: PDFFont, size: number) {

        const words = text.split(' ');
        let line = '';
        let yOffset = y;
        
        for (const word of words) {
          const lineWidth = font.widthOfTextAtSize(line + word + ' ', size);
      
          if (lineWidth > maxWidth) {
            // Draw the current line
            page.drawText(line.trim(), { x, y: yOffset, size, font, color: rgb(0, 0, 0) });
            line = word + ' ';
            yOffset -= size; // Move to the next line
      
            // Check if the next line exceed the maximum height
            if (yOffset < (y - maxHeight)) {
              console.log('Text exceeds the maximum height of the text box area.');
              return;
            }
          } else {
            // Continue adding words to the current line
            line += word + ' ';
          }
        }
      
        // Draw any remaining text
        if (line.trim().length > 0) {
          if (yOffset >= (y - maxHeight)) {
            page.drawText(line.trim(), { x, y: yOffset, size, font, color: rgb(0, 0, 0) });
          } else {
            console.log('Text exceeds the maximum height of the text box area.');
          }
        }
    }
    
};