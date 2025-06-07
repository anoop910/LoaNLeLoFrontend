import axios from "axios";

// Create an instance
const publicEndPointCall = axios.create({
  baseURL: "http://localhost:8080",  // Replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
export default publicEndPointCall;