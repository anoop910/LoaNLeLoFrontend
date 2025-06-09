import React, { useState, useEffect } from "react";
import BankCardForConsumer from "./BankCardForConsumer";
import { getBankForConsumer } from "../../consumerService/getBankForConsumer";

const BankListForConsumer = () => {
const [banks, setBanks] = useState([]);
  const fetchBanks = async () => {
    try {
      const banks = await getBankForConsumer();
      setBanks(banks);
      console.log("Fetched banks:", banks);
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching banks:", error.message);
      alert(error.message); // or show a toast notification
    }

  };
  useEffect(() => {
    fetchBanks();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Available Banks</h1>
      <div className="flex flex-wrap justify-center">
        {banks.length === 0 && (
          <div className="text-center text-gray-500 text-lg font-semibold mt-4">
            No Any Bank Available 
          </div>
        ) }
        {banks.map((bank, index) => (
          <BankCardForConsumer key={index} bank={bank} />
        ))}
      </div>
    </div>
  );
};

export default BankListForConsumer;
