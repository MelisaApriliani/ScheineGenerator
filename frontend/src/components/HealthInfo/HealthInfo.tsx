import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthInfo.css';

interface HealthInfoProps {
  healthInfo: {
    diagnosis: string;
    hospitalTreatment: boolean;
    treatmentType?: string;
    healthcareFacility?: string;
    prescriptionDetails: string;
  };
  setHealthInfo: (info: any) => void;
}

const HealthInfo: React.FC<HealthInfoProps> = ({ healthInfo, setHealthInfo }) => {
  const [treatmentTypes, setTreatmentTypes] = useState<string[]>([]);
  const [healthcareFacilities, setHealthcareFacilities] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHealthInfo({
      ...healthInfo,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setHealthInfo({
      ...healthInfo,
      [name]: checked,
    });
  };

  useEffect(() => {
    if (healthInfo.hospitalTreatment) {
      // Fetch treatment types and healthcare facilities from the API
      axios.get('/api/treatment-types').then((res) => setTreatmentTypes(res.data));
      axios.get('/api/healthcare-facilities').then((res) => setHealthcareFacilities(res.data));
    }
  }, [healthInfo.hospitalTreatment]);

  return (
    <div className="health-info">
      <label>
        Diagnosis:
        <input
          type="text"
          name="diagnosis"
          value={healthInfo.diagnosis}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Request Hospital Treatment:
        <input
          type="checkbox"
          name="hospitalTreatment"
          checked={healthInfo.hospitalTreatment}
          onChange={handleCheckboxChange}
        />
      </label>

      {healthInfo.hospitalTreatment && (
        <>
          <label>
            Treatment Type:
            <select
              name="treatmentType"
              value={healthInfo.treatmentType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Treatment Type</option>
              {treatmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Nearest Healthcare Facility:
            <select
              name="healthcareFacility"
              value={healthInfo.healthcareFacility}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Healthcare Facility</option>
              {healthcareFacilities.map((facility) => (
                <option key={facility} value={facility}>
                  {facility}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      <label>
        Prescription Details:
        <input
          type="text"
          name="prescriptionDetails"
          value={healthInfo.prescriptionDetails}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default HealthInfo;