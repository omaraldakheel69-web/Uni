import axios from "axios";

const API_URL = "http://localhost:5000/api/companies";

export const getCompanies = () => axios.get(API_URL);

export const createCompany = (data) => axios.post(API_URL, data);

export const updateCompany = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteCompany = (id) =>
  axios.delete(`${API_URL}/${id}`);
