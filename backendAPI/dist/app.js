"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// API 1: Store Schein data in the database
app.post('/create-schein', async (req, res) => {
    // try {
    //     const { patientName, doctorName, diagnosis, date } = req.body;
    //     // Create a new Schein entity
    //     const schein = new Schein();
    //     schein.patientName = patientName;
    //     schein.doctorName = doctorName;
    //     schein.diagnosis = diagnosis;
    //     schein.date = date;
    //     // Save Schein to the database
    //     await AppDataSource.getRepository(Schein).save(schein);
    return res.status(201).json({ message: 'Schein created successfully' });
    // } catch (error) {
    //     console.error('Error creating Schein:', error);
    //     return res.status(500).json({ message: 'Error creating Schein' });
    // }
});
// API 2: Generate and preview the PDF
app.post('/generate-pdf', async (req, res) => {
    // try {
    //     const { scheinId } = req.body;
    //     // Fetch the Schein from the database
    //     const schein = await AppDataSource.getRepository(Schein).findOne({
    //         where: { id: scheinId },
    //         select: ['id', 'patientName', 'doctorName', 'diagnosis', 'date'] // Select fields
    //     });
    //     if (!schein) {
    //         return res.status(404).json({ message: 'Schein not found' });
    //     }
    //     // Create a PDF document
    //     const doc = new PDFDocument();
    //     const filePath = `output-schein-${scheinId}.pdf`;
    //     doc.pipe(fs.createWriteStream(filePath));
    //     // Add content to the PDF
    //     doc.fontSize(16).text('Schein Details', { align: 'center' });
    //     doc.text(`Patient Name: ${schein.patientName}`);
    //     doc.text(`Doctor Name: ${schein.doctorName}`);
    //     doc.text(`Diagnosis: ${schein.diagnosis}`);
    //     doc.text(`Date: ${schein.date}`);
    //     // Finalize the PDF and send the response
    //     doc.end();
    //     return res.json({ message: 'PDF generated', filePath });
    // } catch (error) {
    //     console.error('Error generating PDF:', error);
    //     res.status(500).json({ message: 'Error generating PDF' });
    // }
});
// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
exports.default = app;
