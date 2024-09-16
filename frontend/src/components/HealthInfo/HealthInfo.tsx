import React, { useEffect, useState } from 'react';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import Select from 'react-select';
import './HealthInfo.css';
import { FIELD_NAMES, OptionType } from '../../constants/FieldName';


interface HealthInfoProps {
    onChange: (field: string, value: any) => void;
    formData: any;
    errors: { [key: string]: string };
}

const HealthInfo: React.FC<HealthInfoProps> = ({ onChange, formData, errors }) => {
    const [treatmentTypes, setTreatmentTypes] = useState<any[]>([]);
    const [healthcareFacilities, setHealthcareFacilities] = useState<any[]>([]);
    const [details, setDetails] = useState<any[]>([]);
    const [isRequestForHospitalTreatment, setRequestforHospitalTreatment] = useState<boolean>(false);
    const [selectedTreatmentType, setSelectedTreatmentType] = useState<OptionType | null>(null);

    const handleTreatmentType = (key: string, value: OptionType | null ) => {
        
        if(value){
            setSelectedTreatmentType(value);
            
            setDetails((prevData) => {
                const updatedDetails = {
                    ...prevData,
                    [key]: value.value,
                };
        
                console.log("updated details",updatedDetails );
                onChange(FIELD_NAMES.DETAILS, updatedDetails);
                return updatedDetails;
            });
        }else{
            setSelectedTreatmentType(null)
        }
    }

    const handleInputChange = (key: string, value: number | string | null) => {
        setDetails((prevData) => {
            const updatedDetails = {
                ...prevData,
                [key]: value,
            };
       
            onChange(FIELD_NAMES.DETAILS, updatedDetails);
            return updatedDetails;
        });
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked } = e.target;
        setRequestforHospitalTreatment(checked);
        //reset hospital treatment type and recommended hospital selected value

    };

    useEffect(() => {
        console.log("always execute here whenever checked unchecked");
        if (isRequestForHospitalTreatment) {
            // Fetch treatment types and healthcare facilities from the API
            if(!treatmentTypes || treatmentTypes.length <= 0){
              
                ScheinAPI.getHospitalTreatmentTypes().then((response) => {
                    const fetchedTreatmentTypes = response.data.data;
                    setTreatmentTypes(fetchedTreatmentTypes);
                    
                    // Set initial value if there's data available
                    if (fetchedTreatmentTypes.length > 0) {
                        handleTreatmentType(FIELD_NAMES.HOSPITAL_TREATMENT_TYPE,{
                            value: fetchedTreatmentTypes[0].id,
                            label: fetchedTreatmentTypes[0].name
                        })
                    }
                  });
            }else{
                handleTreatmentType(FIELD_NAMES.HOSPITAL_TREATMENT_TYPE,{
                    value: treatmentTypes[0].id,
                    label: treatmentTypes[0].name
                })
            }
            if(!healthcareFacilities || healthcareFacilities.length <= 0){
                ScheinAPI.getHealthcareFacilities().then((response) => setHealthcareFacilities(response.data.data));
            }
        }else{
            handleTreatmentType(FIELD_NAMES.HOSPITAL_TREATMENT_TYPE, {value:0, label:''})
            handleInputChange(FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL, 0);
        }
        console.log("check value", details);
    }, ([isRequestForHospitalTreatment]));

    return (
        <div className="health-info">
            <div className="form-group">
                <label>Diagnosis</label>
                <input
                    type="text"
                    name="diagnosis"
                    value={formData[FIELD_NAMES.DETAILS]?.[FIELD_NAMES.DIAGNOSE] || ""}
                    onChange={(e) => handleInputChange(FIELD_NAMES.DIAGNOSE, e.target.value)}
                    required
                />
                {errors[FIELD_NAMES.DIAGNOSE] && <div className="error">{errors[FIELD_NAMES.DIAGNOSE]}</div>}
            </div>

            
            <input
                type="checkbox"
                name="hospitalTreatmentRequest"
                checked={isRequestForHospitalTreatment}
                onChange={handleCheckboxChange}
            />
            <label>Request Hospital Treatment:</label>
        
            {isRequestForHospitalTreatment && (
                <>
                <div className="form-group">
                    <label>Treatment Type</label>
                    <Select
                        name={FIELD_NAMES.HOSPITAL_TREATMENT_TYPE}
                        value={selectedTreatmentType}
                        options={treatmentTypes.map((type: any) => ({ value: type.id, label: type.name }))}
                        onChange={(selectedOption) => handleTreatmentType(FIELD_NAMES.HOSPITAL_TREATMENT_TYPE, selectedOption)} 
                        placeholder="Select Treatment Type"
                        required
                    />
                    {errors[FIELD_NAMES.HOSPITAL_TREATMENT_TYPE] && <div className="error">{errors[FIELD_NAMES.HOSPITAL_TREATMENT_TYPE]}</div>}
                </div>
                <div className="form-group">
                    <label>Nearest Healthcare Facility</label>
                    <Select
                            name={FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL}
                            options={healthcareFacilities.map((facility: any) => ({ value: facility.id, label: facility.name }))}
                            onChange={(e) => handleInputChange(FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL, e?.value)}
                            placeholder="Select nearest recommended hospital"
                            required
                    />
                    {errors[FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL] && <div className="error">{errors[FIELD_NAMES.NEAREST_RECOMMENDED_HOSPITAL]}</div>}
                </div> 
                </>
            )}

            <div className="form-group">
                <label>Other Prescription Details</label>
                <input
                    type="text"
                    name="prescriptionDetails"
                    value={formData[FIELD_NAMES.DETAILS]?.[FIELD_NAMES.PERSCRIPTION_DETAILS] || ""}
                    onChange={(e) => handleInputChange(FIELD_NAMES.PERSCRIPTION_DETAILS, e.target.value)}
                />
            </div>
        </div>
    );
};

export default HealthInfo;