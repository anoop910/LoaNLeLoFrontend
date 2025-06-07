import React from "react";
import Navbar from "../components/Navbar";
import BankListForConsumer from "../features/consumer/BankListForConsumer";
import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePageLayout;
