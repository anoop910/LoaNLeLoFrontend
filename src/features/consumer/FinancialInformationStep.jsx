import React, { useState } from "react";

const FinancialInformationStep = ({
  formData,
  setFormData,
  handlePrevious,
  handleSubmit
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.annualIncome) {
      newErrors.annualIncome = "Annual income is required.";
    } else if (isNaN(formData.annualIncome) || Number(formData.annualIncome) <= 0) {
      newErrors.annualIncome = "Annual income must be a positive number.";
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required.";
    }

    if (!formData.monthlyDebtPayments) {
      newErrors.monthlyDebtPayments = "Monthly debt payments are required.";
    } else if (
      isNaN(formData.monthlyDebtPayments) ||
      Number(formData.monthlyDebtPayments) < 0
    ) {
      newErrors.monthlyDebtPayments =
        "Monthly debt payments must be 0 or a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">

      <p className="text-blue-600 font-semibold mb-2">Step 3 of 3</p>
      <div className="h-1 bg-blue-600 rounded-full mb-4" style={{ width: "100%" }}></div>
      <h2 className="text-2xl font-bold mb-6">Financial Information</h2>
      <form onSubmit={handleNext}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Annual Income *
            </label>
            <input
              type="text"
              className={`w-full border ${
                errors.annualIncome ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2`}
              value={formData.annualIncome}
              onChange={(e) =>
                setFormData({ ...formData, annualIncome: e.target.value })
              }
            />
            {errors.annualIncome && (
              <p className="text-red-500 text-sm">{errors.annualIncome}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Employment Status *
            </label>
            <select
              className={`w-full border ${
                errors.employmentStatus ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2`}
              value={formData.employmentStatus}
              onChange={(e) =>
                setFormData({ ...formData, employmentStatus: e.target.value })
              }
            >
              <option value="">Select status</option>
              <option value="Full-time Employee">Full-time Employee</option>
              <option value="Part-time Employee">Part-time Employee</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
            {errors.employmentStatus && (
              <p className="text-red-500 text-sm">{errors.employmentStatus}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Monthly Debt Payments *
            </label>
            <input
              type="text"
              className={`w-full border ${
                errors.monthlyDebtPayments ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2`}
              value={formData.monthlyDebtPayments}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyDebtPayments: e.target.value
                })
              }
            />
            {errors.monthlyDebtPayments && (
              <p className="text-red-500 text-sm">
                {errors.monthlyDebtPayments}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialInformationStep;
