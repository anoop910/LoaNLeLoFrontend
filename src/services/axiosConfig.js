// src/api/axiosInstance.js
import axios from "axios";

// Create an instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",  // Replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // adjust the key as needed
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
