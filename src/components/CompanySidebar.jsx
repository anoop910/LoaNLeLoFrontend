import React from "react";
import { Link } from "react-router-dom";

const CompanySidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
          CL
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Company Portal</h1>
      </div>
      <hr />
      {/* Menu Items */}
      <nav className="flex flex-col space-y-1">
        <Link
          to="/company/login"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg">🏢</span>
          <span className="text-sm">Company Login</span>
        </Link>
        <Link
          to="/company/dashboard"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg">📊</span>
          <span className="text-sm">Company Dashboard</span>
        </Link>
       
      </nav>
    </div>
  );
};

export default CompanySidebar;
