import React from "react";
import { Link } from "react-router-dom";
import { CiBank } from "react-icons/ci";


const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
          AL
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Admin Portal</h1>
      </div>
      <hr />
      {/* Menu Items */}
      <nav className="flex flex-col space-y-1">
        <Link
          to="/admin/login"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg">🔑</span>
          <span className="text-sm">Admin Login</span>
        </Link>
        <Link
          to="/admin/bank/register"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg"><CiBank /></span>
          <span className="text-sm">Bank Register</span>
        </Link>
        <Link
          to="/admin/bank/list"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg"><CiBank /></span>
          <span className="text-sm">Bank List</span>
        </Link>
      
        <Link
          to="/admin/companies"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg">📋</span>
          <span className="text-sm">Company Access Requests</span>
        </Link>
        <Link
          to="/admin/consumers"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <span className="text-lg">👥</span>
          <span className="text-sm">Consumer Data Management</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
