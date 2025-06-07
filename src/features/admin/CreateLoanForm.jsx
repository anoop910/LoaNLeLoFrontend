import React, { useState} from "react";
import { createLoan } from "../../services/createLoan";
import { useNavigate } from "react-router-dom";
// import axios from "../services/axiosConfig";

const CreateLoanForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subTitle: "",
    interestRate: "",
  });

  const [errors, setErrors] = useState({});

  // Dummy bankEmail fetched from localStorage or anywhere you store it after login
  const bankEmail = localStorage.getItem("bankEmail") || ""; // Replace with real logic
  console.log("bankEmail" + bankEmail);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Loan name must be at least 3 characters.";
    }
    if (!formData.subTitle || formData.subTitle.length < 5) {
      newErrors.subTitle = "Subtitle must be at least 5 characters.";
    }
    if (!formData.interestRate || parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = "Interest rate must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSend = {
      ...formData,
      bankEmail: bankEmail, // Inject bankEmail here
    };

    createLoan(dataToSend, setFormData);
    navigate("/admin/bank/list");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Create Loan</h2>
      <form onSubmit={handleSubmit}>
        {/* Loan Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Loan Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter loan name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Subtitle */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter subtitle"
          />
          {errors.subTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>
          )}
        </div>

        {/* Interest Rate */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Interest Rate</label>
          <input
            type="number"
            step="0.01"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. 3.5"
          />
          {errors.interestRate && (
            <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Create Loan
        </button>
      </form>
    </div>
  );
};

export default CreateLoanForm;
