import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginRegisterButton = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("login");

  

  const handleTabClick = (tab) => {
    
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold mb-4">Company Portal</h1>
      <div className="flex bg-gray-200 rounded-full p-1">
        <button
          className={`px-6 py-2 rounded-full font-medium ${
            activeTab === "login"
              ? "bg-white text-black shadow"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 rounded-full font-medium ${
            activeTab === "register"
              ? "bg-white text-black shadow"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterButton;
