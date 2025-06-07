import { handleAxiosError } from "../utils/handleAxiosError";
import publicEndPointCall from "../services/publicEndPointCall";

export const getLoanTypeForConsumer = async (email) => {
  try {

    const response = await publicEndPointCall.post("/loan/type", email, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
     
    

    // For other errors, use your error handler
    handleAxiosError(error);
    throw error;  // re-throw if needed
  }
};
