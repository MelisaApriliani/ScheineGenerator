import React, { useState, useEffect } from 'react';
import ScheinTypeSelect from '../../components/ScheinTypeSelect/ScheinTypeSelect';
import CommonInfo from '../../components/CommonInfo/CommonInfo';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
// import HealthInfo from '../HealthInfo/HealthInfo';
// import PaymentInfo from '../PaymentInfo/PaymentInfo';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import './ScheinForm.css';
import { FormData  } from '../../constants/FieldName'; 

const ScheinForm: React.FC = () => {
  const [selectedScheinType, setSelectedScheinType] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({} as FormData);  
  // Log formData whenever it changes
  useEffect(() => {
    console.log("FormData:", JSON.stringify(formData, null, 2));
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

  const handleSubmit = async () => {
    try {
      const response = await ScheinAPI.createSchein(formData);
      await ScheinAPI.generatePdf(response.data.type.id, response.data.id);
      alert('Schein created and PDF generated successfully!');
    } catch (error) {
      console.error('Error creating schein:', error);
      alert('Error creating schein.');
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
            <CommonInfo onChange={handleChange} formData={formData} />
            <PatientInfo onChange={handleChange} />

            <button onClick={handleSubmit}>Preview & Save</button>
            </>

            
        )}
      {/* <HealthInfo onChange={handleChange} />
      <PaymentInfo onChange={handleChange} /> */}
      
    </div>
  );
};

export default ScheinForm;