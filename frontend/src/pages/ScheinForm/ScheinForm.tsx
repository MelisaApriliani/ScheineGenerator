import React, { useState, useEffect } from 'react';
import ScheinTypeSelect from '../../components/ScheinTypeSelect/ScheinTypeSelect';
import CommonInfo from '../../components/CommonInfo/CommonInfo';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
import HealthInfo from '../../components/HealthInfo/HealthInfo';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import { FIELD_NAMES, FormData  } from '../../constants/FieldName';
import { validateCommonInfo, validatePatientInfo, validateHealthInfo, validatePaymentInfo } from '../../util/Validation'; 
import './ScheinForm.css';

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
    handleChange(FIELD_NAMES.SCHEIN_TYPE_ID,typeId)
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
        formErrors = { ...formErrors, ...validateCommonInfo(formData) };
        formErrors = { ...formErrors, ...validatePatientInfo(formData) };
        formErrors = { ...formErrors, ...validateHealthInfo(formData) };
        formErrors = { ...formErrors, ...validatePaymentInfo(formData) };
    }

    // Set the combined errors
    setErrors(formErrors);

    console.log("formErrors after validation:", JSON.stringify(formErrors, null, 2));
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
        handleCreateScheinAndGeneratePDF(formData)
    }else {
        alert('Please enter all required fields before submitting.');
    }
  };

  const handleCreateScheinAndGeneratePDF = async (formData: FormData) => {
    try {
        const createScheinResponse = await ScheinAPI.createSchein(formData);
        console.log("CRATE SCHEIN RESPONSE",JSON.stringify(createScheinResponse, null, 2))
        
        // Check if the response is not undefined, not null, and contains necessary data
        if (createScheinResponse && createScheinResponse.data && createScheinResponse.data.data) {
            const scheinData = createScheinResponse.data.data;

            // Call the generatePdf API
            const generatePdfResponse = await ScheinAPI.generatePdf(scheinData.type.id, scheinData.id, {responseType: 'arraybuffer'});
            console.log("GENERATE PDF RESPONSE",JSON.stringify(generatePdfResponse, null, 2))
            if (generatePdfResponse && generatePdfResponse.data) {
                
                const blob = new Blob([generatePdfResponse.data], { type: 'application/pdf' });

                const pdfUrl = URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');

                // trigger a download of the PDF file
                const downloadLink = document.createElement('a');
                downloadLink.href = pdfUrl;
                downloadLink.download = `${scheinData.type.name}_${scheinData.id}.pdf`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                console.error("Failed to generate PDF.");
                alert('Failed to generate PDF.');
            }
        } else {
            console.error("Invalid response from createSchein API.");
            alert('Invalid response from createSchein API.');
        }
    } catch (error:any) {
        console.error("Error creating Schein or generating PDF:", error);
        alert('Error creating Schein or generating PDF:' + error.message);
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
            <PaymentInfo onChange={handleChange} formData={formData} errors={errors} />

            <button onClick={handleSubmit}>Save & Preview</button>
            </>  
        )}
      
      
    </div>
  );
};

export default ScheinForm;