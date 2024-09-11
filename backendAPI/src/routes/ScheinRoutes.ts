import express from 'express';
import { createSchein, generateScheinPDF } from '../controllers/ScheinController';

const router = express.Router();

router.post('/schein', createSchein);            
router.get('/schein/:id/preview', generateScheinPDF); 

export default router;