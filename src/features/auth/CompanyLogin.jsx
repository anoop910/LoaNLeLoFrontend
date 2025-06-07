import React, { useState } from "react";

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    switch (name) {
      case "email":
        if (!value.trim()) errorMsg = "Company email is required";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        )
          errorMsg = "Please enter a valid email address";
        break;
      case "password":
        if (!value.trim()) errorMsg = "Password is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Company email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      newErrors.email = "Please enter a valid email address";

    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Company Login Submitted:", formData);
      // Submit login data to backend here
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold">
            CP
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Company Portal</h1>
          <p className="text-gray-500">Access your business dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Company Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="company@example.com"
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

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700">
                Keep me signed in
              </label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign In to Portal
          </button>
        </form>

        {/* Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          New to our platform?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Request Access
          </a>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Need help?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
