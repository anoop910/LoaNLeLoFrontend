import React from "react";

const CompanyAccessRequests = () => {
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
            {/* Row 1 */}
            <tr className="border-t">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-800">TechCorp Solutions</p>
                  <p className="text-gray-500 text-sm">Financial Services</p>
                </div>
              </td>
              <td className="py-4 px-4">contact@techcorp.com</td>
              <td className="py-4 px-4">2024-01-15</td>
              <td className="py-4 px-4">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </td>
              <td className="py-4 px-4 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="border-t">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-800">DataFlow Analytics</p>
                  <p className="text-gray-500 text-sm">Data Analytics</p>
                </div>
              </td>
              <td className="py-4 px-4">admin@dataflow.com</td>
              <td className="py-4 px-4">2024-01-14</td>
              <td className="py-4 px-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Approved
                </span>
              </td>
              <td className="py-4 px-4 space-x-2">
                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                  View
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Revoke
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="border-t">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-800">FinSecure Inc</p>
                  <p className="text-gray-500 text-sm">Security Services</p>
                </div>
              </td>
              <td className="py-4 px-4">info@finsecure.com</td>
              <td className="py-4 px-4">2024-01-13</td>
              <td className="py-4 px-4">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Rejected
                </span>
              </td>
              <td className="py-4 px-4 space-x-2">
                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                  View
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Reconsider
                </button>
              </td>
            </tr>

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing 1 to 3 of 12 results
        </p>
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
