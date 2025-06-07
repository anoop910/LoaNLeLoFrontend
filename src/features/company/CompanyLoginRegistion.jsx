import React, { useState } from "react";
import CompanyLogin from "../auth/CompanyLogin";
import LoginRegisterButton from "../../components/LoginRegisterButton";
import RegisterCompanyForm from "../auth/RegisterCompanyForm";

const CompanyLoginRegistion = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LoginRegisterButton onTabChange={setActiveTab} />
      <div className="mt-6 w-full max-w-md">
        {activeTab === "login" ? <CompanyLogin /> : <RegisterCompanyForm/>}
      </div>
    </div>
  );
};

export default CompanyLoginRegistion;
