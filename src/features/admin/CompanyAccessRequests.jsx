import React, { useState, useEffect } from "react";
import { adminGetCompany } from "../../services/adminGetCompany";
import { useNavigate } from "react-router-dom";
import { validateTokenAndRedirect } from "../../utils/tokenUtils";
import LoanRejectPop from "./LoanRejectPop";
import { adminRejectCompnay } from "../../services/adminRejectCompnay";
import { AdminApproveCompany } from "../../services/AdminApproveCompany";

const CompanyAccessRequests = () => {
  const [table, setTable] = useState([{}]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpen = () => setIsPopupOpen(true);
  const handleClose = () => setIsPopupOpen(false);
  const navigate = useNavigate();
  const fetchCompany = async () => {
    try {
      if (validateTokenAndRedirect()) {
        const company = await adminGetCompany();
        setTable(company);

        console.log("Fetch company", company);
      } else {
        alert("Please Login");
        navigate("/admin/login");
      }
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching company:", error.message);
      navigate("/admin/login");
      alert(error.message); // or show a toast notification
    }
  };
  const handleSubmit = async (value) => {
      console.log("Submitted value:", value);
      // Handle the value here (e.g., send to backend)
      try {
        if (validateTokenAndRedirect()) {
          await adminRejectCompnay(value);
          alert("successfull !");
  
        } else {
          navigate("/admin/login");
        }
        // Do something with banks (e.g., set in state)
      } catch (error) {
        console.error("Error fetching consummer:", error.message);
        navigate("/admin/login");
        alert(error.message); // or show a toast notification
      }
    };
    const handleApproveComapany = async () => {
        try {
          if (validateTokenAndRedirect()) {
            await AdminApproveCompany();
            alert("successfull !");
          } else {
            navigate("/admin/login");
          }
          // Do something with banks (e.g., set in state)
        } catch (error) {
          console.error("Error fetching consummer:", error.message);
          navigate("/admin/login");
          alert(error.message); // or show a toast notification
        }
      };
  useEffect(() => {
    fetchCompany();
  }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Company Access Requests
        </h1>
        <p className="text-gray-500">
          Review and manage company data access requests
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by company name or email..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-full md:w-1/6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-4">COMPANY</th>
              <th className="py-3 px-4">CONTACT EMAIL</th>
              <th className="py-3 px-4">REQUEST DATE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {table.map((data, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {data.companyName}
                    </p>
                    <p className="text-gray-500 text-sm">{data.businessType}</p>
                  </div>
                </td>
                <td className="py-4 px-4">{data.businessEmail}</td>
                <td className="py-4 px-4">{data.date}</td>
                <td className="py-4 px-4">
                 {data.status == "APPROVED" && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {data.status}
                    </span>
                  )}
                  {data.status == "REJECTED" && (
                    <span className="bg-red-400 text-green-800 px-2 py-1 rounded-full text-xs">
                      {data.status}
                    </span>
                  )}
                  {data.status == "PENDING" && (
                    <span className="bg-amber-200 text-green-800 px-2 py-1 rounded-full text-xs">
                      {data.status}
                    </span>
                  )}
                 
                </td>
                <td className="py-4 px-4 space-x-2">
                  <button onClick={()=>{
                    const id = data.id;
                    localStorage.setItem("AcomId", id);
                    handleApproveComapany()
                  }} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Approve
                  </button>
                  <button onClick={()=> {
                    const id = data.id;
                    localStorage.setItem("comId",id);
                    handleOpen();
                  }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Reject
                  </button>
                  <LoanRejectPop
                    isOpen={isPopupOpen}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                  />
                </td>
              </tr>
            ))}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Showing 1 to 3 of 12 results</p>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            Previous
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
          <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAccessRequests;
