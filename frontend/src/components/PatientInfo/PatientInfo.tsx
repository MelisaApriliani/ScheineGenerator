import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PatientInfo.css';
// import { FIELD_NAMES } from '../../constants/FieldName'; 

interface PatientInfoProps {
    onChange: (field: string, value: any) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onChange }) => {
  return (
    <div className="patient-info">
      <div className="form-group">
        <label>First Name</label>
        <input type="text" onChange={(e) => onChange('firstName', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" onChange={(e) => onChange('lastName', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <DatePicker selected={new Date()} onChange={(date) => onChange('dob', date)} />
      </div>
    </div>
  );
};

export default PatientInfo;