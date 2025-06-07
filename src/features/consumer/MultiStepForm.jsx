import React, { useState, useEffect } from "react";
import PersonalInformationStep from "./PersonalInformationStep";
import LoanInformationStep from "./LoanInformationStep";
import FinancialInformationStep from "./FinancialInformationStep";
import { applyLoanPreDataLoad } from "../../consumerService/applyLoanPreDataLoad";
import { applyLoanbyConsumer } from "../../consumerService/applyLoanbyConsumer";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadharCardNumber: "",
    dateOfBirth: "",
    homeAddress: "",
    city: "",
    state: "",
    zipCode: "",
    // Step 2
    loanPurpose: "",
    loanAmount: "",
    loanTerm: "",
    creditScoreRange: "",
    // Step 3
    annualIncome: "",
    employmentStatus: "",
    monthlyDebtPayments: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const instrest = localStorage.getItem("interestRate");
  const dataToSend = {
    ...formData, interestRate:instrest,
  }

  const handleSubmit = async () => {

    console.log("Submitting application:", dataToSend);
    try {
      await applyLoanbyConsumer(dataToSend);
      alert("Application submitted successfully!");
      setFormData({});
      navigate("/bank/loan/type");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchConsumer = async () => {
    try {
      const consumer = await applyLoanPreDataLoad();
      setFormData(consumer);

      console.log("Fetch consumer", consumer);
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      alert(error.message); // or show a toast notification
    }
  };
  useEffect(() => {
    fetchConsumer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
      {/* Header */}
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Apply for Your Loan
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Quick and secure application process – get approved in minutes
        </p>
      </div>

      {/* Form Steps */}
      {step === 1 && (
        <PersonalInformationStep
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <LoanInformationStep
          formData={formData}
          setFormData={setFormData}
          handlePrevious={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <FinancialInformationStep
          formData={formData}
          setFormData={setFormData}
          handlePrevious={handlePreviousStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MultiStepForm;
