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

1. Go to backend directory
cd backendAPI

2. Install Dependencies
npm install

3. Create a PostgreSQL database
CREATE DATABASE schein;

4. Configure the database connection
Open .env and update it with your PostgreSQL credentials:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=Schein

5. Run TypeORM migrations to create the database schema:
npm run typeorm migration:run

note: there are 2 migrations in this backend subproject (/src/migration). make sure you your database schema correctly generated with some predefined data in these tables: doctor,healthcare_facility,insurance_provider, hospital_treatment_perscription_type, schein_type

6. Start the backend server
npm run build
npm start