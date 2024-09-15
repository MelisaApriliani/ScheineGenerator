
import { FIELD_NAMES } from '../constants/FieldName'; 


export const validateCommonInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData[FIELD_NAMES.DATE]) {
      errors[FIELD_NAMES.DATE] = 'Date is required';
    }
    if (!formData[FIELD_NAMES.HEALTHCARE_FACILITY_ID] || (formData[FIELD_NAMES.HEALTHCARE_FACILITY_ID] <= 0)) {
      errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID] = 'Healthcare Facility is required';
    }
    if (!formData[FIELD_NAMES.DOCTOR_ID] || (formData[FIELD_NAMES.DOCTOR_ID] <= 0)) {
      errors[FIELD_NAMES.DOCTOR_ID] = 'Doctor is required';
    }
  
    return errors;
};

export const validatePatientInfo = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    if (!formData[FIELD_NAMES.PATIENT] || formData[FIELD_NAMES.PATIENT] == null || formData[FIELD_NAMES.PATIENT].length <=0 ) {

      console.log("the error is here")
      console.log("!formData[FIELD_NAMES.PATIENT]: " + !formData[FIELD_NAMES.PATIENT])
      const isNUll = formData[FIELD_NAMES.PATIENT]==null;
      console.log("formData[FIELD_NAMES.PATIENT]==null: "+ isNUll)
      const isEmpty = formData[FIELD_NAMES.PATIENT].length <=0 ;
      console.log("formData[FIELD_NAMES.PATIENT].length <=0: " + isEmpty)
      errors[FIELD_NAMES.FIRST_NAME] = 'First Name is required';
      errors[FIELD_NAMES.LAST_NAME] = 'Last Name is required';
      errors[FIELD_NAMES.DATE_OF_BIRTH] = 'Date of Birth is required';
    }else{
        console.log("the error is there")
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.FIRST_NAME])) {
            errors[FIELD_NAMES.FIRST_NAME] = 'First Name is required';
        }
        if (isNullOrEmpty(formData[FIELD_NAMES.PATIENT][FIELD_NAMES.LAST_NAME])) {
            errors[FIELD_NAMES.LAST_NAME] = 'Last Name is required';
        }
        if (!formData[FIELD_NAMES.PATIENT][FIELD_NAMES.DATE_OF_BIRTH]) {
            errors[FIELD_NAMES.DATE_OF_BIRTH] = 'Date of Birth is required';
        }

    }
  
    return errors;
};

function isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === '';
}