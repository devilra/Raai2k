import axios from "axios";

// const DEVELOPMENT_BASE_URL = import.meta.VITE_BACKEND_API_DEVELOPMENT_URL;
// const CPANEL_BASE_URL = import.meta.VITE_BACKEND_API_CPANEL_URL;

// console.log(DEVELOPMENT_BASE_URL);

const api = axios.create({
  //baseURL: `http://localhost:5174/api`,
  baseURL: `https://amigowebster.in/raai2k_backend/api`,
  withCredentials: true,
  // timeout: 10000,
});

export default api;
