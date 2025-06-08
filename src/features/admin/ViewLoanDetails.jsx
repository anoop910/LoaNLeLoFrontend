import React from "react";

const ViewLoanDetails = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div  className="fixed inset-0 flex items-center justify-center bg-amber-50/50 bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">Loan Details</h2>
        <div className="space-y-2 mb-4">
          <div><span className="font-semibold">Name:</span> {data.firstName}{data.lastName}</div>
          <div><span className="font-semibold">Phone:</span> {data.phone}</div>
          <div><span className="font-semibold">Home Address:</span> {data.homeAddress}</div>
          <div><span className="font-semibold">Aadhar Number:</span> {data.aadharCardNumber}</div>
          <div><span className="font-semibold">Loan Purpose:</span> {data.loanPurpose}</div>
          <div><span className="font-semibold">Loan Amount:</span> ₹{data.loanAmount}</div>
          <div><span className="font-semibold">Credit Score:</span> {data.creditScore}</div>
          <div><span className="font-semibold">Loan Term:</span> {data.loanTerm} months</div>
          <div><span className="font-semibold">Annual Income:</span> ₹{data.annualIncome}</div>
          <div><span className="font-semibold text-red-600">Rejected Reason:</span> {data.rejectReason || "N/A"}</div>
        </div>

        {/* Close button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanDetails;
