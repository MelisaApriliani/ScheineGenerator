# Schein Generator System
A system for doctors to generate various types of "Scheine" (e.g., AU, Überweisung, Rezepte) used in German medical practices. It includes a backend for form data processing and PDF generation, and a frontend for doctors to input information, preview, and generate the final "Schein."

## Project Structure
The project is divided into two main parts:

Backend: Built with ExpressJS, TypeORM, and PostgreSQL. Handles data storage and PDF generation.
Frontend: Built with Vite and React. Provides an interface for doctors to input the required information and preview the PDF.

## Prerequisites
Before starting, make sure you have the following installed on your system:

1. Node.js (v16 or above): Download Node.js
2. PostgreSQL (v12 or above): Download PostgreSQL (Remember the PostgreSQL credentials you have set here)
3. Git: Download Git
4. PDF Viewer: To preview the generated PDF files

## Installation Instructions

1. Clone the Repository
git clone https://github.com/MelisaApriliani/ScheineGenerator.git
cd ScheineGenerator


### Set Up the Backend

1. Navigate to the backend folder
    ```bash
    cd backendAPI
    ```

2. Install Dependencies

    npm install

3. Create a PostgreSQL database

    psql -U postgres
    CREATE DATABASE schein;

4. Configure the database connection

    Open .env and update it with your PostgreSQL credentials:
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=your_password
    DATABASE_NAME=Schein

5. Run TypeORM migrations to create the database schema

    npx tsc
    npx typeorm migration:run -d dist/ormconfig.js

    note: there are 2 migrations in this backend subproject (/src/migration). make sure you your database schema correctly generated with some predefined      data in these tables: doctor,healthcare_facility,insurance_provider, hospital_treatment_perscription_type, schein_type

6. Start the backend server

    npm run build
    npm start

### Set Up the Frontend

1. Navigate to the frontend folder

cd frontend

2. Install dependencies

npm install

3. Start the frontend development server

npm run dev

4. Test frontend

Test front end on browser using this url "http://localhost:5137

note:if you are using different port on frontend, undate this line in app.ts in /backendAPI
const corsOptions = {
  origin: 'http://localhost:5173', //change it to your port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


### API Endpoints
### POST /api/schein
Description: Stores the form data in the database
Sample API call:http://localhost:3000/api/schein
 "headers": {
    "content-type": "application/json; charset=utf-8"
  },
Request body:
{
  "scheinTypeId": 1,
  "date": "2024-09-16",
  "patient": {
    "dateOfBirth": "2024-06-12",
    "firstName": "Elena",
    "lastName": "Twill",
    "insuranceProviderId": 1,
    "insuranceNo": "110949849234",
    "status": "active"
  },
  "details": {
    "hospitalTreatmentPerscriptionTypeId": 3,
    "nearestRecommendedHospitalId": 4,
    "healthCareFacilityId": 3,
    "diagnose": "fever",
    "perscriptionDetails": "paracetamol, pain killer"
  },
  "doctorId": 2
}

Sample API response:
{
    "message": "Successfully save schein information.",
    "data": {
        "date": "2024-09-16T00:00:00.000Z",
        "perscriptionDetails": "paracetamol, pain killer",
        "diagnose": "fever",
        "type": {
            "id": 1,
            "name": "Mustersammlung"
        },
        "patient": {
            "firstName": "Elena",
            "lastName": "Twill",
            "id": 4,
            "dateOfBirth": "2024-06-12"
        },
        "doctor": {
            "firstName": "Jane",
            "lastName": "Smith",
            "specialization": "General Doctor",
            "licenseNumber": "LIC234567",
            "phoneNumber": "234-567-8901",
            "email": "jane.smith@example.com",
            "id": 2
        },
        "patientInsurance": {
            "insuranceNo": "110949849234",
            "status": "active",
            "id": 8,
            "patient": {
                "firstName": "Elena",
                "lastName": "Twill",
                "id": 4,
                "dateOfBirth": "2024-06-12"
            },
            "insuranceProvider": {
                "id": 1,
                "name": "Blue Cross",
                "insuranceIdentificationNumber": "INS123456"
            }
        },
        "healthcareFacility": {
            "name": "Suburban Health Center",
            "address": "789 Oak St",
            "healthcareFacilityNumber": "HF003",
            "id": 3
        },
        "hospitalTreatmentPerscriptionType": {
            "id": 3,
            "name": "Notfall"
        },
        "nearestRecommendedHospital": {
            "name": "Community Medical Center",
            "address": "101 Pine St",
            "healthcareFacilityNumber": "HF004",
            "id": 4
        },
        "id": 19
    }
}

### GET /api/generate-pdf/{schein_type_id}/{schein_id}
Description: Generate pdf of the created Schein 
Sample API call: http://localhost:3000/api/generate-pdf/1/20
Response:  "arraybuffer" of pdf data


