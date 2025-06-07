// src/components/LoanCard.jsx

import React from "react";

const LoanCard = ({ loan }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-72">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{loan.name}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Subtitle:</span> {loan.subTitle}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Interest Rate:</span> {loan.interestRate}%
      </p>
      {/* Add more fields if needed */}
    </div>
  );
};

export default LoanCard;
