import React, { useState, useEffect } from 'react';
import ScheinTypeSelect from '../../components/ScheinTypeSelect/ScheinTypeSelect';
import CommonInfo from '../../components/CommonInfo/CommonInfo';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
// import HealthInfo from '../HealthInfo/HealthInfo';
// import PaymentInfo from '../PaymentInfo/PaymentInfo';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import './ScheinForm.css';
import { FormData  } from '../../constants/FieldName';
import { validateCommonInfo, validatePatientInfo, validateHealthInfo } from '../../util/Validation'; 
import HealthInfo from '../../components/HealthInfo/HealthInfo';

const ScheinForm: React.FC = () => {
  const [selectedScheinType, setSelectedScheinType] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({} as FormData);  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Log formData whenever it changes
  useEffect(() => {
    console.log("FormData:", JSON.stringify(formData, null, 2));
    console.log("formErrors", JSON.stringify(errors, null, 2));
  }, [formData]);

  const handleScheinTypeChange = (typeId: number) => {
    setSelectedScheinType(typeId);
    // Other logic related to the selected Schein type
    // setFormData({});
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    // Initialize formErrors as an empty object
    let formErrors: Record<string, any> = {};

    console.log("formErrors before validation:", JSON.stringify(formErrors, null, 2));

    // Validate based on the selected Schein type
    if (selectedScheinType === 1) {
        // Merge errors from validateCommonInfo with formErrors
        formErrors = { ...formErrors, ...validateCommonInfo(formData) };
        // Merge errors from validatePatientInfo with formErrors
        formErrors = { ...formErrors, ...validatePatientInfo(formData) };
        formErrors = { ...formErrors, ...validateHealthInfo(formData) };
    }

    // Set the combined errors
    setErrors(formErrors);

    console.log("formErrors after validation:", JSON.stringify(formErrors, null, 2));
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
        try {
            const response = await ScheinAPI.createSchein(formData);
            await ScheinAPI.generatePdf(response.data.type.id, response.data.id);
            alert('Schein created and PDF generated successfully!');
        } catch (error) {
            console.error('Error creating schein:', error);
            alert('Error creating schein.');
        }
    }else {
        alert('Please enter all required fields before submitting.');
    }
  };

  return (
    <div className="schein-form">
        <h2>Create Schein</h2>
        <ScheinTypeSelect
            selectedType={selectedScheinType ?? 0} // Pass default value if undefined
            onSelectType={handleScheinTypeChange}
        />
        {selectedScheinType === 1 && (
            <>
            <CommonInfo onChange={handleChange} formData={formData} errors={errors} />
            <PatientInfo onChange={handleChange} formData={formData} errors={errors} />
            <HealthInfo onChange={handleChange} formData={formData} errors={errors} />

            <button onClick={handleSubmit}>Preview & Save</button>
            </>

            
        )}
      {/* <HealthInfo onChange={handleChange} />
      <PaymentInfo onChange={handleChange} /> */}
      
    </div>
  );
};

export default ScheinForm;