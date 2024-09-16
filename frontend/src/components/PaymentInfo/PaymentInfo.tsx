import React, { useEffect, useState } from 'react';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import Select from 'react-select';
import './PaymentInfo.css';
import { FIELD_NAMES } from '../../constants/FieldName'; 

interface PaymentInfoProps {
    onChange: (field: string, value: any) => void;
    formData: any;
    errors: { [key: string]: string };
}


const PaymentInfo: React.FC<PaymentInfoProps> = ({ onChange, formData, errors }) => {
  const [insuranceProviders, setInsuranceProviders] = useState<string[]>([]);
  const [, setPatient] = useState<any[]>([]);

  // Fetch insurance providers from the API
  useEffect(() => {
    const fetchInsuranceProviders = async () => {
        try {
            ScheinAPI.getInsuranceProviders().then((response) => setInsuranceProviders(response.data.data));
        } catch (error) {
            console.error('Error fetching insurance providers', error);
        }
    };

    fetchInsuranceProviders(); // Fetch the providers only if the insurance checkbox is checked
   
  }, []);

  const handleInputChange = (key: string, value: number | string | null) => {
    setPatient((prevData) => {
        const updatedPatient = {
            ...prevData,  
            [key]: value,  
        };
        onChange(FIELD_NAMES.PATIENT, {
            ...formData.patient,  
            ...updatedPatient,   
        });
 
        return updatedPatient;
    });
  };

  const handleInsuranceNo = (key: string, value: string) => {
    handleInputChange(key, value);
    handleInputChange(FIELD_NAMES.STATUS,(value != null && value.length >0 ) ? 'active' :'');
  }

  return (
    <div className="payment-info-container">
      
        <div className="form-group">
            <label htmlFor="insurance-provider">Insurance Provider</label>
            <Select
                options={insuranceProviders.map((insurance: any) => ({ value: insurance.id, label: insurance.name }))}
                onChange={(e) => handleInputChange(FIELD_NAMES.INSURANCE_PROVIDER_ID, e?.value)}
                placeholder="Select Insurance Provider"
            />
            {errors[FIELD_NAMES.INSURANCE_PROVIDER_ID] && <div className="error">{errors[FIELD_NAMES.INSURANCE_PROVIDER_ID]}</div>}
        </div>
          
        <div className="form-group">
            <label htmlFor="insurance-number">Insurance Number</label>
            <input
              type="text"
              id="insurance-number"
              placeholder="Enter insurance number"
              value={formData[FIELD_NAMES.PATIENT]?.[FIELD_NAMES.INSURANCE_NO] || ""}
              onChange={(e) => handleInsuranceNo(FIELD_NAMES.INSURANCE_NO, e.target.value)} 
            />
            {errors[FIELD_NAMES.INSURANCE_NO] && <div className="error">{errors[FIELD_NAMES.INSURANCE_NO]}</div>}

        </div>
    </div>
  );
};

export default PaymentInfo;