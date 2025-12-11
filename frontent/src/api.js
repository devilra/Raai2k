import axios from "axios";

const DEVELOPMENT_BASE_URL = import.meta.VITE_BACKEND_API_DEVELOPMENT_URL;
const CPANEL_BASE_URL = import.meta.VITE_BACKEND_API_CPANEL_URL;

const api = axios.create({
  //baseURL: `${DEVELOPMENT_BASE_URL}/api`,
  baseURL: `${CPANEL_BASE_URL}/api`,
  withCredentials: true,
  timeout: 10000,
});

export default api;
