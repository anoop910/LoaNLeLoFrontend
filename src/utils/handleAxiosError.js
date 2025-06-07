// src/utils/handleAxiosError.js
export const handleAxiosError = (error) => {
  // Handle known Axios error structure
  if (error.response) {
    // Server responded with a status outside 2xx
    console.error("Server Error:", error.response.data);
    alert(
      error.response.data.message ||
        `Server Error: ${error.response.status} ${error.response.statusText}`
    );
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.request);
    alert("Network error: No response received from the server.");
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
    alert(`An error occurred: ${error.message}`);
  }
  // You can also choose to throw the error again for catch chaining
  // throw error;
};
