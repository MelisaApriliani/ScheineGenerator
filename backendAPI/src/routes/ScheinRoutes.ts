import express from 'express';
import { createSchein, generateScheinPDF } from '../controllers/ScheinController';

const router = express.Router();

router.post('/schein', createSchein);            
router.get('/generate-pdf/:scheinTypeId/:scheinId', generateScheinPDF); 

export default router;