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
exports.Schein = void 0;
const typeorm_1 = require("typeorm");
const Patient_1 = require("../Patient");
const Doctor_1 = require("../Doctor");
const ScheinType_1 = require("./ScheinType");
class Schein {
    constructor() {
        this.date = new Date();
    }
}
exports.Schein = Schein;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schein.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ScheinType_1.ScheinType, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'schein_type_id' }),
    __metadata("design:type", ScheinType_1.ScheinType)
], Schein.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Patient_1.Patient),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", Patient_1.Patient)
], Schein.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Doctor_1.Doctor),
    (0, typeorm_1.JoinColumn)({ name: 'doctor_id' }),
    __metadata("design:type", Doctor_1.Doctor)
], Schein.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Schein.prototype, "date", void 0);
