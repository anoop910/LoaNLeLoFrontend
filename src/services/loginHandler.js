import axiosInstance from "./axiosConfig";

/**
 * Handles user login.
 *
 * @param {Object} formData - {email, password}
 */
export const handleLogin = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/user/login", formData);
    
    const token = response.data; // extract token properly!
    console.log("Login token sent: " + token);

    // Store the token
    localStorage.setItem("jwtToken", token);
    

    alert("Login successful!");
    // Optionally: navigate or call other actions here
  } catch (err) {
    console.log(err.response);

    if (err.response && err.response.status === 403) {
      // Handle 403 Forbidden: remove token and redirect
      console.warn("Access denied: token might be invalid or expired.");
      localStorage.removeItem("jwtToken");
      return;
    }

    if (err.response && err.response.status === 401) {
      // Typically incorrect email/password would be 401 Unauthorized
      alert("Incorrect email or password. Please try again.");
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }
  }
};
