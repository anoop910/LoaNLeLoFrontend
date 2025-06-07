import React from "react";
import { FaUniversity } from "react-icons/fa"; // Font Awesome icon
import { useNavigate } from "react-router-dom";

const BankCardForConsumer = ({ bank }) => {
const navigate = useNavigate();
  if (!bank) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        No bank data available.
      </div>
    );
  }

  // Extract initials
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    const firstInitial = words[0]?.charAt(0).toUpperCase() || "";
    const lastInitial =
      words.length > 1
        ? words[words.length - 1]?.charAt(0).toUpperCase() || ""
        : "";
    return firstInitial + lastInitial;
  };

  const initials = getInitials(bank.name);

  const handleViewLoan = () =>{
    const newemail = bank.email;
    localStorage.setItem("bankEmailForConsumer", newemail);
    navigate("/bank/loan/type")

  }

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 m-4 w-full max-w-xs">
      {/* Top Section with Icon and Name */}
      <div className="flex items-center mb-2 mt-2 ml-2">
        {/* Icon Badge */}
        <div className=" bg-blue-600 text-white rounded-full p-4 mr-4">
          {initials}
        </div>
        {/* Bank Name */}
        <h2 className="text-xl font-bold text-blue-600">{bank.name}</h2>
      </div>

      {/* Additional Info (if any) */}
      {/* You can add subtitle or description if needed */}

      {/* Action Button */}
      <button
        className=" bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 transition duration-200 w-full"
        onClick={handleViewLoan}
      >
        View Loan Type
      </button>
    </div>
  );
};

export default BankCardForConsumer;
