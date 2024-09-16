import React, { useEffect, useState } from 'react';
import { ScheinAPI } from '../../webservices/ScheinAPI';
import Select from 'react-select';
import { OptionType } from '../../constants/FieldName';
import './ScheinTypeSelect.css';

interface ScheinTypeSelectProps {
  selectedType: number; // Change to number since we are passing id
  onSelectType: (typeId: number) => void; // Change to number since we are passing id
}

const ScheinTypeSelect: React.FC<ScheinTypeSelectProps> = ({ selectedType, onSelectType }) => {
  const [scheinTypes, setScheinTypes] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

   // Create an array of options using OptionType
  const options: OptionType[] = scheinTypes.map((scheinType) => ({
        value: scheinType.id,
        label: scheinType.name,
  }));
  const selectedOption = options.find(option => option.value === selectedType) || null;


  useEffect(() => {
    const fetchScheinTypes = async () => {
      try {
        const response = await ScheinAPI.getScheinTypes();
        setScheinTypes(response.data.data); // Adjust based on your API response
      } catch (err:any) {
        console.log(err.message);
        setError('Failed to load Schein types.');
        
      }
    };
    fetchScheinTypes();
  }, []);

  const handleScheinTypeChange = (option: any) => {
    onSelectType(option.value);
  };

  return (
    <div className="schein-type-select-container">
      <label htmlFor="scheinType" className="schein-type-label">
        Schein Type
      </label>
      <div className="schein-type-info">
      <Select
        value={selectedOption}  // Ensure selectedType matches the OptionType
        options={options}
        onChange={handleScheinTypeChange}
        placeholder="Select schein type"
        />
      {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default ScheinTypeSelect;