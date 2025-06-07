import { handleAxiosError } from "../utils/handleAxiosError";
import axios from "./axiosConfig";

export const getAllBanksByAdmin = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.get("/admin/bank/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
