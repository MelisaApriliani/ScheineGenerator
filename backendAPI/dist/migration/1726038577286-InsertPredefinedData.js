"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertPredefinedData1726038577286 = void 0;
class InsertPredefinedData1726038577286 {
    async up(queryRunner) {
        // Insert predefined data into Doctor table
        await queryRunner.query(`
          INSERT INTO "doctor" ("firstName", "lastName", "specialization", "licenseNumber", "phoneNumber", "email")
          VALUES 
            ('John', 'Doe', 'General Doctor', 'LIC123456', '123-456-7890', 'john.doe@example.com'),
            ('Jane', 'Smith', 'General Doctor', 'LIC234567', '234-567-8901', 'jane.smith@example.com'),
            ('James', 'Brown', 'Pediatrician', 'LIC345678', '345-678-9012', 'james.brown@example.com'),
            ('Emma', 'Jones', 'General Doctor', 'LIC456789', '456-789-0123', 'emma.jones@example.com'),
            ('David', 'Miller', 'Dermatologist', 'LIC567890', '567-890-1234', 'david.miller@example.com');
        `);
        // Insert predefined data into HealthcareFacility table
        await queryRunner.query(`
          INSERT INTO "healthcare_facility" ("name", "address", "healthcareFacilityNumber")
          VALUES 
            ('City Hospital', '123 Main St', 'HF001'),
            ('Downtown Clinic', '456 Elm St', 'HF002'),
            ('Suburban Health Center', '789 Oak St', 'HF003'),
            ('Community Medical Center', '101 Pine St', 'HF004'),
            ('Metropolitan General', '202 Cedar St', 'HF005');
        `);
        // Insert predefined data into HospitalTreatmentPerscriptionType table
        await queryRunner.query(`
          INSERT INTO "hospital_treatment_perscription_type" ("name")
          VALUES 
            ('Attending Doctor Treatment'),
            ('Accident'),
            ('Emergency'),
            ('Care-related condition (BVG)');
        `);
        // Insert predefined data into InsuranceProvider table
        await queryRunner.query(`
          INSERT INTO "insurance_provider" ("name", "insuranceIdentificationNumber")
          VALUES 
            ('Blue Cross', 'INS123456'),
            ('Aetna', 'INS234567'),
            ('Cigna', 'INS345678'),
            ('UnitedHealthcare', 'INS456789'),
            ('Kaiser Permanente', 'INS567890');
        `);
        // Insert predefined data into ScheinType table
        await queryRunner.query(`
          INSERT INTO "schein_type" ("name")
          VALUES 
            ('General medical certificate'),
            ('Certificate for estimated date of childbirth'),
            ('Transportation order for medical purposes');
        `);
    }
    async down(queryRunner) {
        // Rollback: Remove the inserted data
        await queryRunner.query(`DELETE FROM "doctor" WHERE "firstName" IN ('John', 'Jane', 'James', 'Emma', 'David');`);
        await queryRunner.query(`DELETE FROM "healthcare_facility" WHERE "name" IN ('City Hospital', 'Downtown Clinic', 'Suburban Health Center', 'Community Medical Center', 'Metropolitan General');`);
        await queryRunner.query(`DELETE FROM "hospital_treatment_perscription_type" WHERE "name" IN ('Attending Doctor Treatment', 'Accident', 'Emergency', 'Care-related condition (BVG)');`);
        await queryRunner.query(`DELETE FROM "insurance_provider" WHERE "name" IN ('Blue Cross', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Kaiser Permanente');`);
        await queryRunner.query(`DELETE FROM "schein_type" WHERE "name" IN ('General medical certificate', 'Certificate for estimated date of childbirth', 'Transportation order for medical purposes');`);
    }
}
exports.InsertPredefinedData1726038577286 = InsertPredefinedData1726038577286;
