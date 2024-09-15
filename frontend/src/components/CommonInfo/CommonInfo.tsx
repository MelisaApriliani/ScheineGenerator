import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import Select from 'react-select';
import './CommonInfo.css';
import { FIELD_NAMES } from '../../constants/FieldName'; 

interface CommonInfoProps {
    onChange: (field: string, value: any) => void;
    formData: any;
    errors: { [key: string]: string };
}

const CommonInfo: React.FC<CommonInfoProps> = ({ onChange, formData, errors }) => {
    const [facilities, setFacilities] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);

    const today = new Date();

    useEffect(() => {
        ScheinAPI.getHealthcareFacilities().then((response) => setFacilities(response.data.data));
        ScheinAPI.getDoctors().then((response) => setDoctors(response.data.data));
        handleDateChange(today);
    }, []);

    const handleFacilityChange = (option: any) => {
        onChange(FIELD_NAMES.HEALTHCARE_FACILITY_ID, option.value);
      };

    const handleDoctorChange = (option: any) => {
        onChange(FIELD_NAMES.DOCTOR_ID, option.value);
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
          // Convert date to YYYY-MM-DD format
          const formattedDate = date.toISOString().split('T')[0];
          onChange(FIELD_NAMES.DATE, formattedDate);
        }
    };

    return (
        <div>
            <label className="schein-type-label">
                Basic Information
            </label>
            <div className="common-info">
                <div className="form-group">
                    <label>Date</label>
                    <DatePicker
                        selected={formData[FIELD_NAMES.DATE] ? new Date(formData[FIELD_NAMES.DATE]) : today} // Use the date from formData if available
                        onChange={handleDateChange}
                        minDate={today}
                        dateFormat="yyyy-MM-dd" // Display format
                    /> 
                    {errors[FIELD_NAMES.DATE] && <div className="error">{errors[FIELD_NAMES.DATE]}</div>}
                </div>
                <div className="form-group">
                    <label>Healthcare Facility</label>
                    <Select
                        options={facilities.map((facility: any) => ({ value: facility.id, label: facility.name }))}
                        onChange={handleFacilityChange}
                        placeholder="Select Healthcare Facility"
                    />
                    {errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID] && <div className="error">{errors[FIELD_NAMES.HEALTHCARE_FACILITY_ID]}</div>}
                </div>
                <div className="form-group">
                    <label>Doctor</label>
                    <Select
                        options={doctors.map((doctor: any) => ({ value: doctor.id, label: `${doctor.firstName} ${doctor.lastName}` }))}
                        onChange={handleDoctorChange}
                        placeholder="Select Doctor"
                    />
                    {errors[FIELD_NAMES.DOCTOR_ID] && <div className="error">{errors[FIELD_NAMES.DOCTOR_ID]}</div>}
                </div>
            </div>
        </div>
    );
};

export default CommonInfo;