import { handleAxiosError } from "../utils/handleAxiosError.js";
import publicEndPointCall from "../services/publicEndPointCall.js";

// Function to register a new bank
export const CompanyRegister = async (fromData) => {
  try {
    const response = await publicEndPointCall.post("company/create", fromData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("error");
     

    }

    // For other errors, use your error handler
    handleAxiosError(error);
    throw error; // re-throw if needed
  }
};
