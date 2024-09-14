import { generatePdf as generateMustersammlungPdf } from './controllers/MustersammlungController';

interface ScheinHandler {
    createSchein: (data: any) => Promise<void>;
    generatePdf: (scheinId: number) => Promise<Buffer>; // Assuming generatePdf returns a Buffer
}

interface Handlers {
    [key: string]: ScheinHandler;
}

export const Handlers = {
    '1': {
        generatePdf: generateMustersammlungPdf,   
    },
   
};