import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FIELD_NAMES } from '../../constants/FieldName'; 

interface PatientInfoProps {
    onChange: (field: string, value: any) => void;
    formData: any;
    errors: { [key: string]: string };
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onChange, formData, errors }) => {
    const [, setPatient] = useState<any[]>([]);

    const today = new Date();

    useEffect(() => {
       
        handleDateChange(today);
    }, []);

    const handleDateChange = (date: Date | null) => {
        if (date) {
          // Convert date to YYYY-MM-DD format
            const formattedDate = date.toISOString().split('T')[0];
       
            setPatient((prevData) => {
                const updatedPatient = {
                ...prevData,
                [FIELD_NAMES.DATE_OF_BIRTH]: formattedDate,
                };
            
                onChange(FIELD_NAMES.PATIENT, {
                ...formData.patient,  
                ...updatedPatient,   
                });
            
                return updatedPatient;
            });
        }
    };

    const handleTextFieldChange = (key: string, value: string | null) => {
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

    return (
        <div>
        <label className="schein-type-label">
                Patient Information
            </label>
        <div className="patient-info">
            <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter first name" value={formData[FIELD_NAMES.PATIENT]?.[FIELD_NAMES.FIRST_NAME] || ""} onChange={(e) => handleTextFieldChange(FIELD_NAMES.FIRST_NAME, e.target.value)} />
                    {errors[FIELD_NAMES.FIRST_NAME] && <div className="error">{errors[FIELD_NAMES.FIRST_NAME]}</div>}

            </div>
            <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter last name" value={formData[FIELD_NAMES.PATIENT]?.[FIELD_NAMES.LAST_NAME] || ""} onChange={(e) => handleTextFieldChange(FIELD_NAMES.LAST_NAME, e.target.value)} />
                    {errors[FIELD_NAMES.LAST_NAME] && <div className="error">{errors[FIELD_NAMES.LAST_NAME]}</div>}
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <DatePicker
                    selected={formData[FIELD_NAMES.DATE_OF_BIRTH] ? new Date(formData[FIELD_NAMES.DATE_OF_BIRTH]) : today} // Use the date from formData if available
                    onChange={handleDateChange}
                    maxDate={today}
                    dateFormat="yyyy-MM-dd"
                />  
                {errors[FIELD_NAMES.DATE_OF_BIRTH] && <div className="error">{errors[FIELD_NAMES.DATE_OF_BIRTH]}</div>}          
            </div>
        </div>
        </div>
    );
};

export default PatientInfo;