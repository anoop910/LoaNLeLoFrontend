import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Business Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessType">
              Business Type
            </label>
            <select
              id="businessType"
              name="businessType"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select business type</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Sole Proprietor">Sole Proprietor</option>
            </select>
          </div>

          {/* Contact First and Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Contact Name</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="contactFirstName"
                placeholder="First name"
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="contactLastName"
                placeholder="Last name"
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Business Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessEmail">
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              placeholder="business@example.com"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Business Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="businessPhone">
              Business Phone
            </label>
            <input
              type="tel"
              id="businessPhone"
              name="businessPhone"
              placeholder="(555) 123-4567"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tax ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="taxId">
              Tax ID
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              placeholder="XX-XXXXXXXX"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Terms Agreement */}
          <div className="mb-4">
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
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
