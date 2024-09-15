import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig'; 
import { Patient } from '../entity/Patient';
import { PatientInsurance } from '../entity/PatientInsurance';
import { Doctor } from '../entity/Doctor';
import { Mustersammlung } from '../entity/schein/MustersammlungSchein';
import { HealthcareFacility } from '../entity/HealthcareFacility';
import { HospitalTreatmentPerscriptionType } from '../entity/HospitalTreatmentPerscriptionType';
import { ScheinType } from '../entity/schein/ScheinType';
import { InsuranceProvider } from '../entity/InsuranceProvider';
import { DeepPartial } from 'typeorm';
import { Handlers } from '../handlers';
import { log } from 'console';

// Save schein infromation
export const createSchein = async (req: Request, res: Response) => {
    try {
        const { patient, scheinTypeId, date, doctorId, details } = req.body;

        console.log("Find associated handler");
        const handler = Handlers[scheinTypeId as keyof typeof Handlers];
        
        if (!handler) {
            return res.status(400).json({ error: 'Invalid Schein type, handler not found for scheinId: ' +scheinTypeId});
        }
        if (!handler.createSchein) {
            return res.status(400).json({ error: 'create schein function not found for scheinTypId: ' +scheinTypeId});
        }

        // let createSchein = await handler.createSchein(req.body);
        handler.createSchein(req.body)
            .then(result => {
                // Process the result
                console.log('Create schein result:', result);
                if(result !== null){
                    return res.status(result.status).json({ message: result.message, data:result.data});
                }
            })
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
};

//generate schein pdf
export const generateScheinPDF = async (req: Request, res: Response) => {

    const { scheinTypeId, scheinId } = req.params;

    console.log("Find associated handler");
    const handler = Handlers[scheinTypeId as keyof typeof Handlers];
    
    if (!handler) {
        return res.status(400).json({ error: 'Invalid Schein type, handler not found' +scheinTypeId});
    }
    if (!handler.generatePdf) {
        return res.status(400).json({ error: 'generate pdf function not found' });
    }
    try {
        console.log("Start executing code in handler");
        let pdfBytes = await handler.generatePdf(Number(scheinId));
 

        // Send the PDF as response
        res.setHeader('Content-Disposition', 'attachment; filename="generated-schein.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        try {
            if(pdfBytes){
                console.log("Send the pdf to client:");
                res.send(Buffer.from(pdfBytes));
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
            res.status(500).json({ error: 'PDF generation failed' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}

export const getAllHealthCareFacility = async (req: Request, res: Response) => {
    try {
        const healthcareFacilityRepository = AppDataSource.getRepository(HealthcareFacility);
        const healthcareFacilities = await healthcareFacilityRepository.find();

        if(!healthcareFacilities || healthcareFacilities.length <=0){
            return res.status(400).json({ error: 'Error healthcare facilities not found!' });
        }
        return res.status(200).json({ message: 'Successfully get all healthcare facilities', data:healthcareFacilities});

    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const doctors = await doctorRepository.find();

        if(!doctors || doctors.length <=0){
            return res.status(400).json({ error: 'Error doctors not found!' });
        }
        return res.status(200).json({ message: 'Successfully get all registered doctors.', data:doctors});

    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}

export const getAllScheinType = async (req: Request, res: Response) => {
    try {
        const scheinTypeRepository = AppDataSource.getRepository(ScheinType);
        const scheinType = await scheinTypeRepository.find();

        if(!scheinType || scheinType.length <=0){
            return res.status(400).json({ error: 'Error schein types not found!' });
        }
        return res.status(200).json({ message: 'Successfully get all schein types.', data:scheinType});

    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}

export const getAllInsuranceProvider = async (req: Request, res: Response) => {
    try {
        const insuranceProviderRepository = AppDataSource.getRepository(InsuranceProvider);
        const insuranceProvider = await insuranceProviderRepository.find();

        if(!insuranceProvider || insuranceProvider.length <=0){
            return res.status(400).json({ error: 'Error insurance provider not found!' });
        }
        return res.status(200).json({ message: 'Successfully get all insurance provider.', data:insuranceProvider});

    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}

export const getAllHospitalTreatmentType = async (req: Request, res: Response) => {
    try {
        const hospitalTreatmentPerscriptionTypeRepository = AppDataSource.getRepository(HospitalTreatmentPerscriptionType);
        const hospitalTraetmentType = await hospitalTreatmentPerscriptionTypeRepository.find();

        if(!hospitalTraetmentType || hospitalTraetmentType.length <=0){
            return res.status(400).json({ error: 'Error hospital treatment type not found!' });
        }
        return res.status(200).json({ message: 'Successfully get all hospital treatment type.', data:hospitalTraetmentType});

    } catch (error:any) {
        res.status(500).json({ error: error.message});
    }

}