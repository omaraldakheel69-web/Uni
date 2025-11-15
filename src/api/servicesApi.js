import axios from "axios";

const API_URL = "http://localhost:5000/api/services"; // your backend URL

export const getServices = () => axios.get(API_URL);

export const createService = (data) => axios.post(API_URL, data);

export const updateService = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteService = (id) =>
  axios.delete(`${API_URL}/${id}`);
