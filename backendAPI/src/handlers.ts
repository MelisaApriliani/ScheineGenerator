import { createSchein as screateMustersammlungSchein, generatePdf as generateMustersammlungPdf } from './controllers/MustersammlungController';
import { ScheinResponse } from '../src/entity/ScheinResponse';

interface ScheinHandler {
    createSchein: (data: any) => Promise<ScheinResponse>;
    generatePdf: (scheinId: number) => Promise<Buffer>; // Assuming generatePdf returns a Buffer
}

interface Handlers {
    [key: string]: ScheinHandler;
}

export const Handlers = {
    '1': {
        createSchein: screateMustersammlungSchein,
        generatePdf: generateMustersammlungPdf,   
    },
   
};