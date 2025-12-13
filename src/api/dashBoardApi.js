import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardStats = () => axios.get(API_URL);
