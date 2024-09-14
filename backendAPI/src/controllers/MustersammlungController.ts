import { AppDataSource } from '../ormconfig'; 
import { Mustersammlung } from '../entity/schein/MustersammlungSchein';
import { InsuranceProvider } from '../entity/InsuranceProvider';
import { Request, Response } from 'express';
import { PDFDocument, rgb } from 'pdf-lib';

import fs from 'fs';
import fontkit from 'fontkit';
import path from 'path';

export const createSchein = async (data: any) => {
    // Implementation for creating Mustersammlung Schein
};

export const generatePdf = async (scheinId: number) => {
    // Fetch the Schein data from the database
    console.log("Begin Generate PDF IN");
    const scheinRepository = AppDataSource.getRepository(Mustersammlung);
    const schein = await scheinRepository.findOne({ 
        where: { id: Number(scheinId) }, 
        relations: ['type', 'patient', 'doctor', 'patientInsurance', 'healthcareFacility', 'hospitalTreatmentPerscriptionType', 'nearestRecommendedHospital']
    });
    if (!schein) {
        throw new Error('Schein not found');
    }
    const insuranceProviderRepository = AppDataSource.getRepository(InsuranceProvider);
    const insuranceProvider = await insuranceProviderRepository.findOneBy({ id: schein.patientInsurance?.id });
    
    try {
        // Load the PDF template
        const templatePath = path.join(__dirname, '../../pdf_template/Mustersammlung.pdf');
        const templateBytes = fs.readFileSync(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);
        pdfDoc.registerFontkit(fontkit);

        // Flatten all form fields
        const form = pdfDoc.getForm();
        form.flatten();

        // Get the first page of the template
        const page = pdfDoc.getPages()[0];


        const { width, height } = page.getSize();  // This will give you the page dimensions
        console.log(`Page width: ${width}, Page height: ${height}`);

        const rotation = page.getRotation().angle;  // Get page rotation angle
        console.log(`Page rotation: ${rotation}`);

        // console.log(`Adjusted Page width: ${actualWidth}, Page height: ${actualHeight}`);

        let size = 12;

       
        page.drawText(`${schein.patient.firstName}, ${schein.patient.lastName}`, {x: 28.5,  y: 228,  size, color: rgb(0, 0, 0),});
        page.drawText(`${schein.patient.dateOfBirth}`, {x:185,y:210,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.patientInsurance?.insuranceNo}`, {x:108,y:181,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.patientInsurance?.status}`, {x:203,y:181,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.healthcareFacility.healthcareFacilityNumber}`, {x:28.5,y:155,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.doctor.licenseNumber}`, {x:108,y:155,size,color: rgb(0, 0, 0),});
        page.drawText(`${schein.date}`, {x:185,y:155,size,color: rgb(0, 0, 0),});
        if(insuranceProvider){
            console.log(`insurance provider:` + insuranceProvider.id+ ' '+insuranceProvider.insuranceIdentificationNumber);
            page.drawText(`${insuranceProvider.id}`, {x:28.5,y:246,size,color: rgb(0, 0, 0),});
            page.drawText(`${insuranceProvider.insuranceIdentificationNumber}`, {x:28.5,y:181,size,color: rgb(0, 0, 0),});
        }
        if(schein.nearestRecommendedHospital){
            console.log(`nearest hospital:` + schein.nearestRecommendedHospital.name);
            page.drawText(`${schein.nearestRecommendedHospital.name}`, {x:267,y:180,size,color: rgb(0, 0, 0),});
        }
        page.drawText(`${schein.diagnose}`, {x:28.5,y:116,size,color: rgb(0, 0, 0),});
        const checkmark = '\u2714';

        // Add custom font to support drawingcheckmark
        const fontBytes = fs.readFileSync(path.join(__dirname, '../../font/DejaVuSans.ttf'));
        const customFont = await pdfDoc.embedFont(fontBytes);
        switch(schein.hospitalTreatmentPerscriptionType?.id){
            case 5:
                page.drawText(checkmark, {x: 265, y: 225,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            case 6:
                page.drawText(checkmark, {x: 265, y: 214,size,font:customFont, color: rgb(0, 0, 0),});
                
                break;
            case 7:
                page.drawText(checkmark, {x: 337, y: 225,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            case 8:
                page.drawText(checkmark, {x: 337, y: 214,size,font:customFont, color: rgb(0, 0, 0),});
                break;
            
            default:
                
                break;
        }

        const pdfBytes = await pdfDoc.save();

        console.log("PDF generated successfully", pdfBytes.length); 

        return pdfBytes;
    }catch(error){
        console.error('Error generating PDF:', error);

    }
    
};