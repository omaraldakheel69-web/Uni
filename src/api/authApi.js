import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginAdmin = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });
