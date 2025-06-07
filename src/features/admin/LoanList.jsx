// src/pages/LoanList.jsx

import React, { useEffect, useState } from "react";
import LoanCard from "../../components/LoanCard";
import { getAllLoans } from "../../services/getAllLoans";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const getEmail = localStorage.getItem("bankEmail");
  const emailData = {email:getEmail};

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const fetchedLoans = await getAllLoans(emailData);
        setLoans(fetchedLoans);
      } catch (error) {
        console.error("Error fetching loans:", error);
        alert(error.message);
      }
    };

    fetchLoans();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Available Loans</h1>
      <div className="flex flex-wrap justify-center">
        {loans.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-semibold mt-4">
            No Loans Available
          </div>
        ) : (
          loans.map((loan, index) => <LoanCard key={index} loan={loan} />)
        )}
      </div>
    </div>
  );
};

export default LoanList;
