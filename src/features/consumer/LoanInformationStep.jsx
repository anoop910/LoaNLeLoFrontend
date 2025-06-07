import React, { useState } from "react";

const LoanInformationStep = ({ formData, setFormData, handlePrevious, handleNextStep }) => {
  const [errors, setErrors] = useState({});
  const loanPurpose = localStorage.getItem("loanName");

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    }
    return error;
  };

  // Handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle onBlur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Validate all fields on submit
  const validateAll = () => {
  const step2Fields = ['loanPurpose', 'loanAmount', 'loanTerm', 'creditScoreRange'];
  const newErrors = {};
  step2Fields.forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      newErrors[key] = error;
    }
  });
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  // Handle Next
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      handleNextStep(); // call parent handler to move to next step
    }
  };

  return (
    <div className=" flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        {/* Step Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-blue-600 font-medium">
            Step 2 of 3
          </span>
          <span className="text-sm text-gray-500">67% Complete</span>
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
          <div
            className="bg-blue-500 h-1 rounded-full"
            style={{ width: "67%" }}
          ></div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6">Loan Information</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Loan Purpose */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Loan Purpose <span className="text-red-500">*</span>
              </label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.loanPurpose
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              >
                <option value="">Select purpose</option>
                <option value={loanPurpose}>{loanPurpose}</option>

                
              </select>
              {errors.loanPurpose && (
                <p className="text-xs text-red-600 mt-1">{errors.loanPurpose}</p>
              )}
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Loan Amount <span className="text-red-500">*</span>
              </label>
              <select
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.loanAmount
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              >
                <option value="">Select amount</option>
                <option value="10000.00">10,000</option>
                <option value="100000.00">10,0000</option>
              </select>
              {errors.loanAmount && (
                <p className="text-xs text-red-600 mt-1">{errors.loanAmount}</p>
              )}
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Loan Term <span className="text-red-500">*</span>
              </label>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.loanTerm
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              >
                <option value="">Select term</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
              </select>
              {errors.loanTerm && (
                <p className="text-xs text-red-600 mt-1">{errors.loanTerm}</p>
              )}
            </div>

            {/* Credit Score Range */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Credit Score Range <span className="text-red-500">*</span>
              </label>
              <select
                name="creditScoreRange"
                value={formData.creditScoreRange}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.creditScoreRange
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              >
                <option value="">Select range</option>
                <option value="300-579">300 - 579 (Poor)</option>
                <option value="580-669">580 - 669 (Fair)</option>
                <option value="670-739">670 - 739 (Good)</option>
                <option value="740-799">740 - 799 (Very Good)</option>
                <option value="800-850">800 - 850 (Excellent)</option>
              </select>
              {errors.creditScoreRange && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.creditScoreRange}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded shadow hover:bg-gray-200"
            >
              ← Previous
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              Next Step →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanInformationStep;
