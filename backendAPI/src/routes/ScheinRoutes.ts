import express from 'express';
import { createSchein, generateScheinPDF,getAllHealthCareFacility, getAllDoctors, 
    getAllScheinType, getAllInsuranceProvider, getAllHospitalTreatmentType 
 } from '../controllers/ScheinController';

const router = express.Router();

router.post('/schein', createSchein);            
router.get('/generate-pdf/:scheinTypeId/:scheinId', generateScheinPDF);
router.get('/healthcarefacilities', getAllHealthCareFacility); 
router.get('/doctors', getAllDoctors); 
router.get('/insuranceprovider', getAllInsuranceProvider); 
router.get('/hospitaltreatmenttype', getAllHospitalTreatmentType); 
router.get('/scheintype', getAllScheinType);


export default router;