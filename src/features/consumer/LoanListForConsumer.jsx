// src/pages/LoanList.jsx

import React, { useEffect, useState } from "react";
import { getLoanTypeForConsumer } from "../../consumerService/getLoanTypeForConsumer";
import LoanCardForConsumer from "./LoanCardForConsumer";

const LoanListForConsumer = () => {
  
    const [loans, setLoans] = useState([]);
    const getEmail = localStorage.getItem("bankEmailForConsumer");
    const emailData = {email:getEmail};

    useEffect(() => {
      const fetchLoansForConsumer = async () => {
        try {
          const fetchedLoans = await getLoanTypeForConsumer(emailData);
          setLoans(fetchedLoans);
        } catch (error) {
          console.error("Error fetching loans:", error);
          alert(error.message);
        }
      };

      fetchLoansForConsumer();
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
          loans.map((loan, index) => <LoanCardForConsumer key={index} loan={loan} />)
        )}
      </div>
    </div>
  );
};

export default LoanListForConsumer;
