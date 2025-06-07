import React, { useState } from "react";
import { consumerRegister } from "../../consumerService/consumerRegister";
import { useNavigate } from "react-router-dom";

const ConsumerRegisterForm = () => {
  const navigate =  useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" || name === "lastName") {
      if (!value.trim()) error = "This field is required";
    } else if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
        error = "Invalid email address";
    } else if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value))
        error = "Invalid phone number";
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

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const error = validateField(name, fieldValue);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    // Check if any errors
    const hasErrors = Object.values(newErrors).some((err) => err);
    if (!hasErrors) {
      console.log("Form submitted", formData);
      // Proceed with submission (API call)

      try {
        const response = await consumerRegister(formData);
        console.log("consumer registered successfully:", response);
        setFormData({});
        alert("You are successfull Register!")
        navigate("/user/login");
      } catch (error) {
        console.error(
          "Error consumer register:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mt-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold mb-2">
            CR
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Consumer Registration
          </h1>
          <p className="text-gray-500 text-center">
            Sign up to access your loan dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* First and Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Full Name *</label>
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
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
                  Terms of Service
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
            className={`w-full py-2 rounded-md text-white transition duration-200 ${
              formData.termsAgreed
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConsumerRegisterForm;
