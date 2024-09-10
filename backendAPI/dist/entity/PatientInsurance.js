"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInsurance = void 0;
const typeorm_1 = require("typeorm");
const Patient_1 = require("./Patient");
const InsuranceProvider_1 = require("./InsuranceProvider");
let PatientInsurance = class PatientInsurance {
    constructor() {
        this.insuranceNo = ""; // Insurance number
        this.status = ""; // Insurance status (e.g., active, inactive)
    }
};
exports.PatientInsurance = PatientInsurance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PatientInsurance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Patient_1.Patient, (patient) => patient.patientInsurances),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", Patient_1.Patient)
], PatientInsurance.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'insurance_provider_id' }),
    __metadata("design:type", InsuranceProvider_1.InsuranceProvider)
], PatientInsurance.prototype, "insuranceProvider", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PatientInsurance.prototype, "insuranceNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientInsurance.prototype, "status", void 0);
exports.PatientInsurance = PatientInsurance = __decorate([
    (0, typeorm_1.Entity)()
], PatientInsurance);
