import React, { useState } from 'react';
import ScheinTypeSelect from '../../components/ScheinTypeSelect/ScheinTypeSelect';
import CommonInfo from '../../components/CommonInfo/CommonInfo';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
// import HealthInfo from '../HealthInfo/HealthInfo';
// import PaymentInfo from '../PaymentInfo/PaymentInfo';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import './ScheinForm.css';

const ScheinForm: React.FC = () => {
  const [selectedScheinType, setSelectedScheinType] = useState<number | undefined>(undefined);

  const handleScheinTypeChange = (typeId: number) => {
    setSelectedScheinType(typeId);
    // Other logic related to the selected Schein type
  };
  
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
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
      {/* <ScheinTypeSelect onScheinTypeChange={(value) => handleChange('scheinType', value)} /> */}
      <CommonInfo onChange={handleChange} />
      <PatientInfo onChange={handleChange} />
      {/* <HealthInfo onChange={handleChange} />
      <PaymentInfo onChange={handleChange} /> */}
      <button onClick={handleSubmit}>Preview & Save</button>
    </div>
  );
};

export default ScheinForm;