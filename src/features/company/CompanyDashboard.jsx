import React, { useState, useEffect } from "react";
import { companyGetConsumer } from "../../CompanyService/companyGetConsumer";
import { validateTokenAndRedirect } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const [table, setTable] = useState([{}]);
  const navigate = useNavigate();
  const handleGetData = async () => {
  
    // Handle the value here (e.g., send to backend)
    try {
      if (validateTokenAndRedirect()) {
        const consumer = await companyGetConsumer();
        setTable(consumer);
      } else {
        alert("Please login or Not Approve");
        navigate("/company/login");
      }
      // Do something with banks (e.g., set in state)
    } catch (error) {
      console.error("Error fetching consummer:", error.message);
      navigate("/company/login");
      alert(error.message); // or show a toast notification
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  if(!table){
    return (
        <div className="text-center text-gray-500 text-lg font-semibold mt-4">
            You are not Approve
          </div>
    )
  }
  return (
    <div className="p-6 bg-gray-50 max-h-screen ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Accessible Consumer Data
        </h1>
        <p className="text-gray-500">
          View and manage the consumers your company can access
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search consumers by name, email, or loan ID..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Access Levels</option>
            <option>Full Access</option>
            <option>Limited Access</option>
            <option>View Only</option>
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
              <th className="py-3 px-4">PHONE NO</th>
              <th className="py-3 px-4">LOAN TYPE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">LOAN AMOUNT</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {/* Row 1 */}

            {table.map((data, index) => (
              <tr className="border-t">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <p className="font-medium text-gray-800">{data.firstName}{data.lastName}</p>
                      <p className="text-gray-500 text-sm">
                        {data.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">{data.phone}</td>
                <td className="py-4 px-4">
                  <span>
                   {data.loanPurpose}
                  </span>
                </td>
                <td className="py-4 px-4">
                 {data.status == "ACTIVE" && (
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
                  {data.status == "COMPLETE" && (
                    <span className="bg-amber-200 text-green-800 px-2 py-1 rounded-full text-xs">
                      {data.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">{data.loanAmount}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Showing 1 to 4 of 1,247 results</p>
        <div className="flex items-center space-x-1">
          <button
            className="px-3 py-1 rounded border text-gray-400 cursor-not-allowed"
            disabled
          >
            &lt;
          </button>
          <button className="px-3 py-1 rounded bg-blue-600 text-white">
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

export default CompanyDashboard;
