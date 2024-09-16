
import { FIELD_NAMES } from '../constants/FieldName'; 


export const validateCommonInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData[FIELD_NAMES.DATE]) {
      errors[FIELD_NAMES.DATE] = 'Date is required!';
    }
   
    if (!formData[FIELD_NAMES.DOCTOR_ID] || (formData[FIELD_NAMES.DOCTOR_ID] <= 0)) {
      errors[FIELD_NAMES.DOCTOR_ID] = 'Doctor is required!';
    }

    if (!formData[FIELD_NAMES.DETAILS] || formData[FIELD_NAMES.DETAILS] == null || formData[FIELD_NAMES.DETAILS].length <=0 ) {
        errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID] = 'Healthcare Facility is required!';
    }else{
        if (!formData[FIELD_NAMES.DETAILS]?.[FIELD_NAMES.HEALTHCARE_FACILITY_ID] || (formData[FIELD_NAMES.DETAILS]?.[FIELD_NAMES.HEALTHCARE_FACILITY_ID] <= 0)) {
            errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID] = 'Healthcare Facility is required!';
        }
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
        }else{
            if(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.FIRST_NAME].length < 2 || formData[FIELD_NAMES.PATIENT][FIELD_NAMES.FIRST_NAME].length > 20){
                errors[FIELD_NAMES.FIRST_NAME] = 'First Name should be minimum 2 characters and maximum 20 characters length!';

            }
        }
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.LAST_NAME])) {
            errors[FIELD_NAMES.LAST_NAME] = 'Last Name is required!';
        }else{
            if(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.LAST_NAME].length < 2 || formData[FIELD_NAMES.PATIENT][FIELD_NAMES.LAST_NAME].length > 20){
                errors[FIELD_NAMES.LAST_NAME] = 'Last Name should be minimum 2 characters and maximum 20 characters length!';

            }
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
        }else{
            if(formData[FIELD_NAMES.DETAILS][FIELD_NAMES.DIAGNOSE].length < 10 || formData[FIELD_NAMES.DETAILS][FIELD_NAMES.DIAGNOSE].length > 100){
                errors[FIELD_NAMES.DIAGNOSE] = 'Description of diagnosis should be between 10 to 100 characters!';

            }
        }

        if(formData[FIELD_NAMES.DETAILS][FIELD_NAMES.HOSPITAL_TREATMENT_TYPE] >0 ){
            if (formData[FIELD_NAMES.DETAILS][FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL] <=0) {
                errors[FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL] = 'Recommended hospital is required!';
            }
        }
    }
    return errors;
}

export const validatePaymentInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};

    if(formData[FIELD_NAMES.PATIENT]?.[FIELD_NAMES.INSURANCE_PROVIDER_ID] >0 ){
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.INSURANCE_NO] )) {
            errors[FIELD_NAMES.INSURANCE_NO] = 'Insurance number is required if payment by using insurance!';
        }else{
            if(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.INSURANCE_NO].length < 5 || formData[FIELD_NAMES.PATIENT][FIELD_NAMES.INSURANCE_NO].length > 20){
                errors[FIELD_NAMES.INSURANCE_NO] = 'Insurance number should be between 10 to 100 characters!';
            }
        }
    }

    if(!isNullOrEmpty(formData[FIELD_NAMES.PATIENT]?.[FIELD_NAMES.INSURANCE_NO])){
        if (!formData[FIELD_NAMES.PATIENT][FIELD_NAMES.INSURANCE_PROVIDER_ID] || formData[FIELD_NAMES.PATIENT][FIELD_NAMES.INSURANCE_PROVIDER_ID] <=0) {
            errors[FIELD_NAMES.INSURANCE_PROVIDER_ID] = 'Please select insurance provider of this patient\'s insurance';
        }
    }
    return errors;
}

function isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === '';
}