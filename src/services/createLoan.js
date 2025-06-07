import { handleAxiosError } from "../utils/handleAxiosError";
import axios from "./axiosConfig";

export const createLoan = async (dataToSend, setFormData) => {
    

 try {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.post(
      "/admin/bank/create/loan",
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Loan created:", response.data);
    alert("Loan created successfully!");
    localStorage.removeItem("bankEmail");
    
    // Reset form state
    setFormData({
      name: "",
      subTitle: "",
      interestRate: "",
    });
    
  } catch (error) {
     if (error.response && error.response.status === 403) {
        // Handle 403 Forbidden: remove token and redirect
        console.warn("Access denied: token might be invalid or expired.");
        localStorage.removeItem("jwtToken");
        window.location.href = "/admin/login";  // Or use your router's navigate()
        return;
      }
    

    // For other errors, use your error handler
    handleAxiosError(error);
    throw error;  // re-throw if needed
  }
  
};
