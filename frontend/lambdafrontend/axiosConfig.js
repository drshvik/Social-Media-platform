import axios from "axios";
import { getToken } from "./tokenUtils";

const url = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: url || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
