import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PatientInfo.css';
import { FIELD_NAMES } from '../../constants/FieldName'; 

interface PatientInfoProps {
    onChange: (field: string, value: any) => void;
    formData: any;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onChange, formData }) => {
    const [patient, setPatient] = useState<any[]>([]);

    const today = new Date();

    const handleDateChange = (date: Date | null) => {
        if (date) {
          // Convert date to YYYY-MM-DD format
          const formattedDate = date.toISOString().split('T')[0];
          setPatient((prevData) => ({
            ...prevData,
            [FIELD_NAMES.DATE_OF_BIRTH]: formattedDate,
          }));
          onChange(FIELD_NAMES.PATIENT, patient);
        }
    };

    const handleTextFieldChange = (key:string, value: string | null) => {
        if (value) {
          
          setPatient((prevData) => ({
            ...prevData,
            [key]: value,
          }));

          onChange(FIELD_NAMES.PATIENT, patient);
        }
    };

    return (
        <div className="patient-info">
            <div className="form-group">
                    <label>First Name</label>
                    <input type="text" onChange={(e) => handleTextFieldChange(FIELD_NAMES.FIRST_NAME, e.target.value)} />
            </div>
            <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" onChange={(e) => handleTextFieldChange(FIELD_NAMES.LAST_NAME, e.target.value)} />
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <DatePicker
                    selected={formData[FIELD_NAMES.DATE_OF_BIRTH] ? new Date(formData[FIELD_NAMES.DATE_OF_BIRTH]) : today} // Use the date from formData if available
                    onChange={handleDateChange}
                    maxDate={today}
                    dateFormat="yyyy-MM-dd"
                />            
            </div>
        </div>
    );
};

export default PatientInfo;