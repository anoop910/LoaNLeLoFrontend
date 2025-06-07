import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa"; // Using Font Awesome icon
import { useLocation, useNavigate } from "react-router-dom";
import { validateTokenAndRedirect } from "../../utils/tokenUtils";

const LoanCardForConsumer = ({ loan }) => {
  const navigate = useNavigate();

  if (!loan) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        No loan data available.
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

  const initials = getInitials(loan.name);

  const handleApplyLoan = () => {
    if (validateTokenAndRedirect()) {
      const loanname = loan.name;
      const insterest = loan.interestRate;
      localStorage.setItem("interestRate", insterest);
      localStorage.setItem("loanName", loanname);
      navigate("/user/apply/loan");
    } else {
      alert("You are not Login");
      navigate("/user/login");
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 m-4 w-full max-w-xs">
      <div className="flex items-center mb-2 mt-2 ml-2">
        {/* Icon */}
        <div className=" bg-blue-600 text-white rounded-full p-4 mr-4">
          {initials}
        </div>
        {/* Loan Name */}
        <h2 className="text-xl font-semibold text-blue-700">{loan.name}</h2>
      </div>

      <p className="text-gray-600 mb-2 ml-2">
        <span className="font-semibold"></span> {loan.subTitle}
      </p>
      <p className="text-gray-600 mb-4 ml-2">
        <span className="font-semibold">Interest Rate:</span>{" "}
        {loan.interestRate}%
      </p>

      {/* Apply Loan Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
        onClick={handleApplyLoan}
      >
        Apply Loan
      </button>
    </div>
  );
};

export default LoanCardForConsumer;
