import React from "react";
import CompanySidebar from "../components/CompanySidebar";
import { Outlet } from "react-router-dom";
const CompanyLoyout = () => {
  return (
    <div className="flex ">
      <div className="fixed">
        <CompanySidebar />
      </div>

      <div className="flex-1 pl-6 bg-gray-50 min-h-screen ">
        <div className="ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyLoyout;
