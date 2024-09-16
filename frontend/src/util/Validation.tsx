
import { FIELD_NAMES } from '../constants/FieldName'; 


export const validateCommonInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData[FIELD_NAMES.DATE]) {
      errors[FIELD_NAMES.DATE] = 'Date is required!';
    }
    if (!formData[FIELD_NAMES.HEALTHCARE_FACILITY_ID] || (formData[FIELD_NAMES.HEALTHCARE_FACILITY_ID] <= 0)) {
      errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID] = 'Healthcare Facility is required!';
    }
    if (!formData[FIELD_NAMES.DOCTOR_ID] || (formData[FIELD_NAMES.DOCTOR_ID] <= 0)) {
      errors[FIELD_NAMES.DOCTOR_ID] = 'Doctor is required!';
    }
  
    return errors;
};

export const validatePatientInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData[FIELD_NAMES.PATIENT] || formData[FIELD_NAMES.PATIENT] == null || formData[FIELD_NAMES.PATIENT].length <=0 ) {
      errors[FIELD_NAMES.FIRST_NAME] = 'First Name is required!';
      errors[FIELD_NAMES.LAST_NAME] = 'Last Name is required!';
      errors[FIELD_NAMES.DATE_OF_BIRTH] = 'Date of Birth is required!';
    }else{
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.FIRST_NAME])) {
            errors[FIELD_NAMES.FIRST_NAME] = 'First Name is required!';
        }
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.LAST_NAME])) {
            errors[FIELD_NAMES.LAST_NAME] = 'Last Name is required!';
        }
        if (!formData[FIELD_NAMES.PATIENT][FIELD_NAMES.DATE_OF_BIRTH]) {
            errors[FIELD_NAMES.DATE_OF_BIRTH] = 'Date of Birth is required!';
        }

    }
  
    return errors;
};

export const validateHealthInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};

    if (!formData[FIELD_NAMES.DETAILS] || formData[FIELD_NAMES.DETAILS] == null || formData[FIELD_NAMES.DETAILS].length <=0 ) {
        errors[FIELD_NAMES.DIAGNOSE] = 'Diagnose is required!';
    }else{
        if (isNullOrEmpty(formData[FIELD_NAMES.DETAILS][FIELD_NAMES.DIAGNOSE])) {
            errors[FIELD_NAMES.DIAGNOSE] = 'Diagnose is required!';
        }

        if(formData[FIELD_NAMES.DETAILS][FIELD_NAMES.HOSPITAL_TREATMENT_TYPE] >0 ){
            if (formData[FIELD_NAMES.DETAILS][FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL] <=0) {
                errors[FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL] = 'Recommended hospital is required!';
            }
        }
    }

    return errors;

}

function isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === '';
}