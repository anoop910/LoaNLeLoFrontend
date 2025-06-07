import React, { useState } from "react";
import { registerBank } from "../../services/bankRegister";
import {useNavigate} from "react-router-dom";


const BankRegisterForm = () => {

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "Bank name is required";
        break;
      case "licenseNumber":
        if (!value.trim()) errorMsg = "License number is required";
        break;
      case "contactNumber":
        if (!value.trim()) {
          errorMsg = "Contact number is required";
        } else if (!/^[+]?[0-9]{10,15}$/.test(value)) {
          errorMsg = "Please enter a valid phone number";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMsg = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errorMsg = "Please enter a valid email address";
        }
        break;
      case "address":
        if (!value.trim()) errorMsg = "Address is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation on submit
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Bank name is required";
    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[+]?[0-9]{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted Successfully:", formData);
      // Submit data to backend here
      try {
        const token = localStorage.getItem("jwtToken"); // example storage
        const response = await registerBank(formData, token);
        console.log("Bank registered successfully:", response);
        navigate("/admin/login")
        setFormData({});
      } catch (error) {
        console.error(
          "Error registering bank:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold mb-2">
            BK
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Bank Registration
          </h1>
          <p className="text-gray-500 text-center">
            Register your bank details to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Bank Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
              placeholder="Enter bank name"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* License Number */}
          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block text-gray-700 mb-1">
              License Number *
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.licenseNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
              placeholder="Enter license number"
            />
            {errors.licenseNumber && (
              <p className="text-xs text-red-600 mt-1">
                {errors.licenseNumber}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.contactNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
              placeholder="e.g. +911234567890"
            />
            {errors.contactNumber && (
              <p className="text-xs text-red-600 mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
              placeholder="bank@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
              placeholder="Enter bank address"
            ></textarea>
            {errors.address && (
              <p className="text-xs text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Register Bank
          </button>
        </form>

        {/* Support */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Need help?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default BankRegisterForm;
