import React, { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    diagnosis: '',
  });

  const handleInputChange = (e) => {
    const{name, value} = e.target;
    setFormData({ ...formData, [name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/schein',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="patientName" value={formData.patientName} onChange={handleInputChange} placeholder="Patient Name" />
      <input name="doctorName" value={formData.doctorName} onChange={handleInputChange} placeholder="Doctor Name" />
      <input name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} placeholder="Diagnosis" />
      <select name="scheinType" onChange={handleInputChange}>
        <option value="AU">AU</option>
        <option value="Rezepte">Rezepte</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );

  
}

export default App
