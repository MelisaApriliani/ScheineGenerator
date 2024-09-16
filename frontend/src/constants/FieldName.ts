export const FIELD_NAMES = {
    HEALTHCARE_FACILITY_ID: 'healthCareFacilityId',
    DOCTOR_ID: 'doctorId',
    PATIENT: 'patient',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DATE_OF_BIRTH: 'dateOfBirth',
    INSURANCE_NO: 'insuranceNo',
    STATUS: 'status',
    INSURANCE_PROVIDER_ID: 'insuranceProviderId',
    SCHEIN_TYPE_ID: 'scheinTypeId',
    DETAILS: 'details',
    DIAGNOSE: 'diagnose',
    PERSCRIPTION_DETAILS: 'perscriptionDetails',
    HOSPITAL_TREATMENT_TYPE: 'hospitalTreatmentPerscriptionTypeId',
    NEAREST_RECOMMENDED_HOSPITAL: 'nearestRecommendedHospitalId',
    DATE: 'date',
};

// Define a base type for form data
export type FormData = Record<string, any>;

export type OptionType = {
    value: string | number;
    label: string;
  };