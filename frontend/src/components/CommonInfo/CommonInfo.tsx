import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import Select from 'react-select';
import './CommonInfo.css';

interface CommonInfoProps {
  onChange: (field: string, value: any) => void;
}

const CommonInfo: React.FC<CommonInfoProps> = ({ onChange }) => {
  const [facilities, setFacilities] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    ScheinAPI.getHealthcareFacilities().then((response) => setFacilities(response.data));
    ScheinAPI.getDoctors().then((response) => setDoctors(response.data));
  }, []);

  const handleFacilityChange = (option: any) => {
    onChange('facilityId', option.value);
  };

  const handleDoctorChange = (option: any) => {
    onChange('doctorId', option.value);
  };

  return (
    <div className="common-info">
      <div className="form-group">
        <label>Date</label>
        <DatePicker selected={new Date()} onChange={(date) => onChange('date', date)} />
      </div>
      <div className="form-group">
        <label>Healthcare Facility</label>
        <Select
          options={facilities.map((facility: any) => ({ value: facility.id, label: facility.name }))}
          onChange={handleFacilityChange}
          placeholder="Select Healthcare Facility"
        />
      </div>
      <div className="form-group">
        <label>Doctor</label>
        <Select
          options={doctors.map((doctor: any) => ({ value: doctor.id, label: doctor.name }))}
          onChange={handleDoctorChange}
          placeholder="Select Doctor"
        />
      </div>
    </div>
  );
};

export default CommonInfo;