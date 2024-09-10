import express from 'express';
import { AppDataSource } from './ormconfig';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import "dotenv/config";

const app = express();
app.use(express.json());

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;