import React, { useState } from "react";
import { useEffect } from "react";
import { applyLoanPreDataLoad } from "../../consumerService/applyLoanPreDataLoad";
import { validateTokenAndRedirect } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { profileLoanData } from "../../consumerService/profileLoanData";

const ConsumerProfile = () => {
  const navigate = useNavigate();
 const [fromData, setFormData]  = useState({});
 const [loanDatas, setLoanDatas] = useState([]);

 const fetchConsumer = async () => {
    try {
      const consumer = await applyLoanPreDataLoad();
      const consumerLoanData = await profileLoanData();
      setFormData(consumer)
      setLoanDatas(consumerLoanData);

      console.log("Fetch consumer", consumer);
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      alert(error.message); // or show a toast notification
    }
  };
  useEffect(() => {
    if(validateTokenAndRedirect()){
    fetchConsumer();
    }else{
      alert("You are not Login")
      navigate("/user/login")

    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* My Profile Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-3xl font-bold mb-2">Consumer Profile</h2>
        <p className="text-gray-600 mb-6">
          Manage your profile information and view loan details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadOnlyInput label="First Name" value={fromData.firstName} />
          <ReadOnlyInput label="Last Name" value={fromData.lastName} />
          <ReadOnlyInput label="Email Address" value={fromData.email} />
          <ReadOnlyInput label="Phone Number" value={fromData.phone} />
          <ReadOnlyInput label="Address" value={fromData.homeAddress} className="md:col-span-2" />
          <ReadOnlyInput label="City" value={fromData.city} />
          <ReadOnlyInput label="State" value={fromData.state} />
          <ReadOnlyInput label="ZIP Code" value={fromData.zipCode} />
          <ReadOnlyInput label="Date of Birth" value={fromData.dateOfBirth} className="md:col-span-2" />
        </div>
      </div>

      {/* My Loans Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">My Loans</h2>

        {/* Loan Cards */}
    {
      loanDatas.map((loan, index) => (
        <LoanCard key={index} type={loan.loanPurpose} amount={loan.loanAmount} monthly={loan.monthlyPayment} interest={loan.interestRate} status={loan.status} />
      ))
    }

        {/* <LoanCard
          type="Personal Loan"
          
          amount="$25,000"
          monthly="$748.50"
          interest="5.25%"
          dueDate="2024-12-15"
          progress="12 of 36 payments"
          status="Active"
          progressPercent={33}
          color="purple"
        />

        <LoanCard
          type="Auto Loan"
          amount="$8,000"
          final="$425.00"
          interest="4.75%"
          completed="2023-11-15"
          progress="48 of 48 payments"
          status="Completed"
          progressPercent={100}
          color="blue"
        />

        <LoanCard
          type="Home Improvement Loan"
          amount="$35,000"
          status="Pending"
          applicationDate="2024-01-10"
          expectedDecision="2024-01-25"
          progress="Under Review"
          progressPercent={10}
          color="yellow"
        /> */}
      </div>
    </div>
  );
};

const ReadOnlyInput = ({ label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-gray-500 text-sm mb-1">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-700"
    />
  </div>
);

const LoanCard = ({
  type,
  id,
  amount,
  monthly,
  interest,
  dueDate,
  completed,
  final,
  applicationDate,
  expectedDecision,
  progress,
  status,
  progressPercent,
  color,
}) => {
  const colorMap = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
  };
  const statusColor = {
    ACTIVE: "bg-green-100 text-green-700",
    COMPLETE: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-white", 
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold">{type}</h3>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
        <span className={`text-sm px-2 py-1 rounded ${statusColor[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-sm space-y-1 mb-2">
        <p>
          <strong>Loan Amount:</strong> {amount}
        </p>
        {monthly && (
          <p>
            <strong>Monthly Payment:</strong> {monthly}
          </p>
        )}
        {final && (
          <p>
            <strong>Final Payment:</strong> {final}
          </p>
        )}
        {interest && (
          <p>
            <strong>Interest Rate:</strong> {interest}
          </p>
        )}
        {dueDate && status !== "Completed" && (
          <p>
            <strong>Due Date:</strong> {dueDate}
          </p>
        )}
        {completed && (
          <p>
            <strong>Completed:</strong> {completed}
          </p>
        )}
        {applicationDate && (
          <p>
            <strong>Application Date:</strong> {applicationDate}
          </p>
        )}
        {expectedDecision && (
          <p>
            <strong>Expected Decision:</strong> {expectedDecision}
          </p>
        )}
        <p>
          <strong>Progress:</strong> {progress}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded h-2">
        <div
          className={`h-2 rounded ${colorMap[color]}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConsumerProfile;
