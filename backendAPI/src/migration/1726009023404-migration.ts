import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726009023404 implements MigrationInterface {
    name = 'Migration1726009023404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insurance_provider" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "insuranceIdentificationNumber" character varying NOT NULL, CONSTRAINT "PK_4ad547de5778161630514c326b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_insurance" ("id" SERIAL NOT NULL, "insuranceNo" character varying NOT NULL, "status" character varying, "patient_id" integer, CONSTRAINT "PK_29bd33325acf4c3794562bd53f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "specialization" character varying NOT NULL, "licenseNumber" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "healthcare_facility" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "healthcareFacilityNumber" character varying NOT NULL, CONSTRAINT "PK_1388d0eac8c2018ae5f0ed6be78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospital_treatment_perscription_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_41b65f0942f512997815717729d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schein_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fd43b7a59b6ecd5b28d8971ced0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mustersammlung" ("id" SERIAL NOT NULL, "date" TIMESTAMP, "perscriptionDetails" character varying, "diagnose" character varying, "schein_type_id" integer NOT NULL, "patient_id" integer, "doctor_id" integer, "patient_insurance_id" integer, "healthcare_facility_id" integer, "hospital_treatment_type_id" integer, "recommended_hospital_id" integer, CONSTRAINT "PK_959c25fcadc1a44e223d01af8de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient_insurance" ADD CONSTRAINT "FK_f1e090416faea8edd2a7219479d" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_c2ac88d43894a77ae0311d7c44d" FOREIGN KEY ("schein_type_id") REFERENCES "schein_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_6c0e93e8dc48a4eeaf502633647" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_2347a22eaa05a3a1e93df21581a" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_923dcf5e1767cbc77b4d938de11" FOREIGN KEY ("patient_insurance_id") REFERENCES "patient_insurance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_b4309bca8c4a92a13d6fcc5a443" FOREIGN KEY ("healthcare_facility_id") REFERENCES "healthcare_facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_1cc1cb4f7fbeb1f5b85ba4a318a" FOREIGN KEY ("hospital_treatment_type_id") REFERENCES "hospital_treatment_perscription_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" ADD CONSTRAINT "FK_fa1899f2dacf5e0794d9596f1ce" FOREIGN KEY ("recommended_hospital_id") REFERENCES "healthcare_facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_fa1899f2dacf5e0794d9596f1ce"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_1cc1cb4f7fbeb1f5b85ba4a318a"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_b4309bca8c4a92a13d6fcc5a443"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_923dcf5e1767cbc77b4d938de11"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_2347a22eaa05a3a1e93df21581a"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_6c0e93e8dc48a4eeaf502633647"`);
        await queryRunner.query(`ALTER TABLE "mustersammlung" DROP CONSTRAINT "FK_c2ac88d43894a77ae0311d7c44d"`);
        await queryRunner.query(`ALTER TABLE "patient_insurance" DROP CONSTRAINT "FK_f1e090416faea8edd2a7219479d"`);
        await queryRunner.query(`DROP TABLE "mustersammlung"`);
        await queryRunner.query(`DROP TABLE "schein_type"`);
        await queryRunner.query(`DROP TABLE "hospital_treatment_perscription_type"`);
        await queryRunner.query(`DROP TABLE "healthcare_facility"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "patient_insurance"`);
        await queryRunner.query(`DROP TABLE "insurance_provider"`);
    }

}
