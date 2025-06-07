import { handleAxiosError } from "../utils/handleAxiosError.js";
import axios from "../services/axiosConfig.js";

// Function to register a new bank
export const applyLoanbyConsumer = async (data) => {
  
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.post("/user/take/loan", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle 403 Forbidden: remove token and redirect
      console.warn("Access denied: token might be invalid or expired.");
      localStorage.removeItem("jwtToken");
      window.location.href = "/user/login"
      return;
    }

    // For other errors, use your error handler
    handleAxiosError(error);
    throw error; // re-throw if needed
  }
};
