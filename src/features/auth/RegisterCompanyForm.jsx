import React, { useState } from "react";
import { CompanyRegister } from "../../CompanyService/CompanyRegister";

const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    contactFirstName: "",
    contactLastName: "",
    businessEmail: "",
    businessPhone: "",
    taxId: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (
      name === "companyName" ||
      name === "contactFirstName" ||
      name === "contactLastName"
    ) {
      if (!value.trim()) error = "This field is required";
    } else if (name === "businessType") {
      if (!value) error = "Please select a business type";
    } else if (name === "businessEmail") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
        error = "Invalid email address";
    } else if (name === "businessPhone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value))
        error = "Invalid phone number";
    } else if (name === "taxId") {
      if (!value.trim()) error = "Tax ID is required";
      // Optional: add regex for taxId format validation here
    } else if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
    } else if (name === "confirmPassword") {
      if (!value) error = "Confirm your password";
      else if (value !== formData.password) error = "Passwords do not match";
    } else if (name === "termsAgreed") {
      if (!value) error = "You must agree to the terms";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate on change
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (!hasErrors) {
      console.log("Form submitted", formData);
      try {
        const response = await CompanyRegister(formData);
        console.log("Company registered successfully:", response);
        setFormData({
        companyName: "",
        businessType: "",
        contactFirstName: "",
        contactLastName: "",
        businessEmail: "",
        businessPhone: "",
        taxId: "",
        password: "",
        confirmPassword: "",
        termsAgreed: false,
      });
        alert("You are successfull Register!");
      } catch (error) {
        console.error(
          "Error consumer register:",
          error.response?.data || error.message
        );
      }
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full m-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold mb-2">
            RC
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Register Company
          </h1>
          <p className="text-gray-500 text-center">
            Create your business account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="companyName">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.companyName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.companyName && (
              <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Business Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessType">
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.businessType
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            >
              <option value="">Select business type</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Sole Proprietor">Sole Proprietor</option>
            </select>
            {errors.businessType && (
              <p className="text-xs text-red-600 mt-1">{errors.businessType}</p>
            )}
          </div>

          {/* Contact First and Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Contact Name *</label>
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="contactFirstName"
                  placeholder="First name"
                  value={formData.contactFirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.contactFirstName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                {errors.contactFirstName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.contactFirstName}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="contactLastName"
                  placeholder="Last name"
                  value={formData.contactLastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.contactLastName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                {errors.contactLastName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.contactLastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessEmail">
              Business Email *
            </label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              placeholder="business@example.com"
              value={formData.businessEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.businessEmail
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.businessEmail && (
              <p className="text-xs text-red-600 mt-1">
                {errors.businessEmail}
              </p>
            )}
          </div>

          {/* Business Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessPhone">
              Business Phone *
            </label>
            <input
              type="tel"
              id="businessPhone"
              name="businessPhone"
              placeholder="(555) 123-4567"
              value={formData.businessPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.businessPhone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.businessPhone && (
              <p className="text-xs text-red-600 mt-1">
                {errors.businessPhone}
              </p>
            )}
          </div>

          {/* Tax ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="taxId">
              Tax ID *
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              placeholder="XX-XXXXXXXX"
              value={formData.taxId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.taxId
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.taxId && (
              <p className="text-xs text-red-600 mt-1">{errors.taxId}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must contain at least 8 characters.
            </p>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="mb-4">
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Business Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.termsAgreed && (
              <p className="text-xs text-red-600 mt-1">{errors.termsAgreed}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.termsAgreed}
            className={`w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 ${
              !formData.termsAgreed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create Business Account
          </button>
        </form>

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

export default RegisterCompanyForm;
