import { handleAxiosError } from "../utils/handleAxiosError.js";
import axios from "./axiosConfig.js";

// Function to register a new bank
export const registerBank = async (bankData, token) => {
  
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.post("admin/bank/create", bankData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    alert("Bank Register successful!")
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle 403 Forbidden: remove token and redirect
      console.warn("Access denied: token might be invalid or expired.");
      localStorage.removeItem("jwtToken");
      window.location.href = "/admin/login"; // Or use your router's navigate()
      return;
    }

    // For other errors, use your error handler
    handleAxiosError(error);
    throw error; // re-throw if needed
  }
};
