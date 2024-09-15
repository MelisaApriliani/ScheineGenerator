import React, { useState, useEffect } from 'react';
import './ScheinTypeSelect.css';
import { ScheinAPI } from '../../webservices/ScheinAPI';

interface ScheinTypeSelectProps {
  selectedType: number; // Change to number since we are passing id
  onSelectType: (typeId: number) => void; // Change to number since we are passing id
}

const ScheinTypeSelect: React.FC<ScheinTypeSelectProps> = ({ selectedType, onSelectType }) => {
  const [scheinTypes, setScheinTypes] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="schein-type-select-container">
      <label htmlFor="scheinType" className="schein-type-label">
        Schein Type
      </label>
      <div className="schein-type-info">
      <select
        id="scheinType"
        value={selectedType}
        onChange={(e) => onSelectType(Number(e.target.value))} // Convert value to number
        className="schein-type-dropdown"
      >
        <option value="">Select a Schein type</option>
        {scheinTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      {error && <div className="schein-type-error">{error}</div>}
      </div>
    </div>
  );
};

export default ScheinTypeSelect;