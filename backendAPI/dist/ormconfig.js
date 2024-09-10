"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const Patient_1 = require("./entity/Patient");
const Doctor_1 = require("./entity/Doctor");
const PatientInsurance_1 = require("./entity/PatientInsurance");
const InsuranceProvider_1 = require("./entity/InsuranceProvider");
const HealthcareFacility_1 = require("./entity/HealthcareFacility");
const HospitalTreatmentPerscriptionType_1 = require("./entity/HospitalTreatmentPerscriptionType");
const ScheinType_1 = require("./entity/schein/ScheinType");
const MustersammlungSchein_1 = require("./entity/schein/MustersammlungSchein");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Doctor_1.Doctor,
        Patient_1.Patient,
        PatientInsurance_1.PatientInsurance,
        InsuranceProvider_1.InsuranceProvider,
        HealthcareFacility_1.HealthcareFacility,
        HospitalTreatmentPerscriptionType_1.HospitalTreatmentPerscriptionType,
        ScheinType_1.ScheinType,
        MustersammlungSchein_1.Mustersammlung
    ],
    migrations: [__dirname + '/migration/*.js'],
    synchronize: false,
});
