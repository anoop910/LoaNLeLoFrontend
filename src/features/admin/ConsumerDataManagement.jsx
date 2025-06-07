import React from "react";
import { useState, useEffect } from "react";
import LoanRejectPop from "./LoanRejectPop";
import { adminGetConsumerDataForDashboard } from "../../services/adminGetConsumerDataForDashboard";
import { validateTokenAndRedirect } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { adminRejectLoan } from "../../services/adminRejectLoan";

const ConsumerDataManagement = () => {
  const navigate = useNavigate();
  
const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpen = () => setIsPopupOpen(true);
  const handleClose = () => setIsPopupOpen(false);
const [table, setTable] = useState([]);

  const fetchConsumer = async () => {

    try {
      if(validateTokenAndRedirect()){
      const consumer = await adminGetConsumerDataForDashboard();
      setTable(consumer);

      console.log("Fetch consumer", consumer);
      }else{
        navigate("/admin/login")
      }
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      navigate("/admin/login")
      alert(error.message); // or show a toast notification
    }
  };
  useEffect(() => {
    fetchConsumer();
  }, []);
  const handleSubmit = async (value) => {
    console.log("Submitted value:", value);
    // Handle the value here (e.g., send to backend)
    try {
      if(validateTokenAndRedirect()){
       await adminRejectLoan(value);
      alert("successfull !")

      console.log("Fetch consumer", );
      }else{
        navigate("/admin/login")
      }
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      navigate("/admin/login")
      alert(error.message); // or show a toast notification
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Consumer Data Management
        </h1>
        <p className="text-gray-500">
          Manage and monitor consumer loan data and applications
        </p>
      </div>

      {/* Search, Filter, and Export */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name, loan ID, or email..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Defaulted</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Export Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-4">CONSUMER</th>
              <th className="py-3 px-4">LOAN ID</th>
              <th className="py-3 px-4">LOAN AMOUNT</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">DUE DATE</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>

          {
            table.map((cdata, index)=> (
              <tr key={index} className="border-t">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-800">{cdata.firstName}{cdata.lastName}</p>
                  <p className="text-gray-500 text-sm">{cdata.email}</p>
                </div>
              </td>
              <td className="py-4 px-4">{cdata.id}</td>
              <td className="py-4 px-4">{cdata.loanAmount}</td>
              <td className="py-4 px-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </td>
              <td className="py-4 px-4">{cdata.startDate}</td>
              <td className="py-4 px-4 space-x-2">
                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                  View
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Approve
                </button>
                <button onClick={()=>{
                  const id = cdata.id;
                  localStorage.setItem("loanId",id);
                  handleOpen()
                }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Reject 
                </button>
                <LoanRejectPop isOpen={isPopupOpen}
                              onClose={handleClose}
                              onSubmit={handleSubmit}/>
              </td>
            </tr>
            ))
          }

         
            {/* More rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing 1 to 5 of 247 results
        </p>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            &lt;
          </button>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            2
          </button>
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            3
          </button>
          <span className="px-3 py-1 rounded text-gray-500">...</span>
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            50
          </button>
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            &gt;
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ConsumerDataManagement;
