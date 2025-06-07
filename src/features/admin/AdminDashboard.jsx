import React, { useState, useEffect } from "react";
import { adminGetConsumerDataForDashboard } from "../../services/adminGetConsumerDataForDashboard";
import { data } from "react-router-dom";

const AdminDashboard = () => {
  const [table, setTable] = useState([]);

  const fetchConsumer = async () => {
    try {
      const consumer = await adminGetConsumerDataForDashboard();
      setTable(consumer);

      console.log("Fetch consumer", consumer);
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      alert(error.message); // or show a toast notification
    }
  };
  useEffect(() => {
    fetchConsumer();
  }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">
          Overview of loan analytics and system metrics
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Consumers */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Consumers</p>
            <h2 className="text-2xl font-bold text-gray-800">12,847</h2>
            <p className="text-green-600 text-sm mt-1">+8.2% from last month</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-2">
            <span className="text-2xl">👥</span>
          </div>
        </div>

        {/* Total Loans */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Loans</p>
            <h2 className="text-2xl font-bold text-gray-800">$2.4M</h2>
            <p className="text-green-600 text-sm mt-1">
              +12.5% from last month
            </p>
          </div>
          <div className="bg-green-100 rounded-lg p-2">
            <span className="text-2xl">💲</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Pending Approvals</p>
            <h2 className="text-2xl font-bold text-gray-800">247</h2>
            <p className="text-orange-600 text-sm mt-1">Requires attention</p>
          </div>
          <div className="bg-orange-100 rounded-lg p-2">
            <span className="text-2xl">⏳</span>
          </div>
        </div>
      </div>

      {/* Recent Loan Applications */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Loan Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2">APPLICANT</th>
                <th className="py-2">LOAN AMOUNT</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">APPLY DATE</th>
                <th className="py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {table.map((data, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3">
                    <div>
                      <p className="font-medium text-gray-800">{data.firstName}{data.lastName}</p>
                      <p className="text-gray-500 text-sm">
                       {data.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3">{data.loanAmount}</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="py-3">{data.startdate}</td>
                  <td className="py-3 space-x-2">
                    <button className="text-blue-600 hover:underline">
                      Review
                    </button>
                    <button className="text-gray-600 hover:underline">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
