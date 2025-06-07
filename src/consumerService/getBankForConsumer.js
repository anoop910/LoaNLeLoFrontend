import { handleAxiosError } from "../utils/handleAxiosError";
import publicEndPointCall from "../services/publicEndPointCall";

export const getBankForConsumer = async () => {
  try {

    const response = await publicEndPointCall.get("/all/bank/providing/loan");

    return response.data;
  } catch (error) {
    // For other errors, use your error handler
    handleAxiosError(error);
    throw error; // re-throw if needed
  }
};
