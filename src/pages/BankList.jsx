import React, { useState, useEffect } from "react";
import BankCard from "../components/BankCard";
import { getAllBanksByAdmin } from "../services/getAllBanksByAdmin";

const BankList = () => {
   const [banks, setBanks] = useState([]);
  const fetchBanksbyAdmin = async () => {
   
    
    try {
      const bank = await getAllBanksByAdmin();
      setBanks(bank);
      console.log("Fetched banks:", bank);
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching banks:", error.message);
      alert(error.message); // or show a toast notification
    }

  };
  
  useEffect(() => {
    fetchBanksbyAdmin();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Registered Banks</h1>
      <div className="flex flex-wrap justify-center">
        {banks.length === 0 && (
          <div className="text-center text-gray-500 text-lg font-semibold mt-4">
            You Have no any Bank
          </div>
        ) }
        {banks.map((bank, index) => (
          <BankCard key={index} bank={bank} />
        ))}
      </div>
    </div>
  );
};

export default BankList;
