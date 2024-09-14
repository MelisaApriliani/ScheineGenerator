import { AppDataSource } from '../ormconfig'; 
import { Mustersammlung } from '../entity/schein/MustersammlungSchein';
import { Request, Response } from 'express';
import { PDFDocument, rgb } from 'pdf-lib';

import fs from 'fs';
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
    
    try {
        // Load the PDF template
        const templatePath = path.join(__dirname, '../../pdf_template/test1.pdf');
        const templateBytes = fs.readFileSync(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);

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
      
        const pdfBytes = await pdfDoc.save();

        console.log("PDF generated successfully", pdfBytes.length); 

        return pdfBytes;
    }catch(error){
        console.error('Error generating PDF:', error);

    }
    
};