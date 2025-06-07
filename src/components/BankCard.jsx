import React from "react";
import { useNavigate } from "react-router-dom";

const BankCard = ({ bank }) => {
    const navigate = useNavigate();


  const handleCreateLoan = () => {
    const email = bank.email;
    localStorage.setItem("bankEmail", email);
    navigate("/admin/loan/create");
  };
  const handleViewLoan = () => {
    const email = bank.email;
    localStorage.setItem("bankEmail", email);
    navigate("/admin/view/loan");
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full m-4">
      {/* Bank Name */}
      <h2 className="text-xl font-bold text-purple-700 mb-2">
        {bank.name}
      </h2>

      {/* License Number */}
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">License Number:</span> {bank.licenseNumber}
      </p>

      {/* Contact Number */}
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Contact Number:</span> {bank.contactNumber}
      </p>

      {/* Email */}
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Email:</span> {bank.email}
      </p>

      
      {/* Optional: Action Button */}
      <div className="mt-4">
        <button onClick={handleViewLoan} className="m-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200">
          View Loan Type
        </button>
        <button onClick={handleCreateLoan} className="m-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200">
          Create Loan
        </button>
      </div>
    </div>
  );
};

export default BankCard;
