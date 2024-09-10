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
exports.Mustersammlung = void 0;
const typeorm_1 = require("typeorm");
const Schein_1 = require("./Schein");
const HospitalTreatmentPerscriptionType_1 = require("../HospitalTreatmentPerscriptionType");
const PatientInsurance_1 = require("../PatientInsurance");
const HealthcareFacility_1 = require("../HealthcareFacility");
let Mustersammlung = class Mustersammlung extends Schein_1.Schein {
};
exports.Mustersammlung = Mustersammlung;
__decorate([
    (0, typeorm_1.ManyToOne)(() => PatientInsurance_1.PatientInsurance),
    (0, typeorm_1.JoinColumn)({ name: 'patient_insurance_id' }),
    __metadata("design:type", PatientInsurance_1.PatientInsurance)
], Mustersammlung.prototype, "patientInsurance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HealthcareFacility_1.HealthcareFacility, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'healthcare_facility_id' }),
    __metadata("design:type", HealthcareFacility_1.HealthcareFacility)
], Mustersammlung.prototype, "healthcareFacility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HospitalTreatmentPerscriptionType_1.HospitalTreatmentPerscriptionType),
    (0, typeorm_1.JoinColumn)({ name: 'hospital_treatment_type_id' }),
    __metadata("design:type", HospitalTreatmentPerscriptionType_1.HospitalTreatmentPerscriptionType)
], Mustersammlung.prototype, "hospitalTreatmentPerscriptionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HealthcareFacility_1.HealthcareFacility, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'recommended_hospital_id' }),
    __metadata("design:type", HealthcareFacility_1.HealthcareFacility)
], Mustersammlung.prototype, "nearestRecommendedHospital", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mustersammlung.prototype, "perscriptionDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mustersammlung.prototype, "diagnose", void 0);
exports.Mustersammlung = Mustersammlung = __decorate([
    (0, typeorm_1.Entity)()
], Mustersammlung);
