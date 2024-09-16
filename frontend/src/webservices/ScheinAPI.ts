import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your backend API URL

export const ScheinAPI = {
  getScheinTypes: async () => {
    return axios.get(`${API_BASE_URL}/scheintype`);
  },
  getHealthcareFacilities: async () => {
    return axios.get(`${API_BASE_URL}/healthcarefacilities`);
  },
  getDoctors: async () => {
    return axios.get(`${API_BASE_URL}/doctors`);
  },
  getHospitalTreatmentTypes: async () => {
    return axios.get(`${API_BASE_URL}/hospitaltreatmenttype`);
  },
  getInsuranceProviders: async () => {
    return axios.get(`${API_BASE_URL}/insuranceprovider`);
  },
  createSchein: async (scheinData: any) => {
    return axios.post(`${API_BASE_URL}/schein`, scheinData);
  },
  generatePdf: async (scheinTypeId: number, scheinId: number, config = {}) => {
    return axios.get(`${API_BASE_URL}/generate-pdf/${scheinTypeId}/${scheinId}`, config);
  },
 

};


