// src/services/apiService.ts
import axios from "axios";

// Create an instance of Axios
const Axios = axios.create({
  baseURL:  "https://node-server-lms.vercel.app",

  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses, e.g., unauthorized, server errors, etc.
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default Axios;
