import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import CompanySidebar from "./components/CompanySidebar";
import AdminDashboard from "./features/admin/AdminDashboard";
import CompanyAccessRequests from "./features/admin/CompanyAccessRequests";
import ConsumerDataManagement from "./features/admin/ConsumerDataManagement";
import AdminLogin from "./features/auth/AdminLogin";
import CompanyLogin from "./features/auth/CompanyLogin";
import ConsumerLogin from "./features/auth/ConsumerLogin";
import ConsumerRegisterForm from "./features/auth/ConsumerRegisterForm";
import RegisterCompanyForm from "./features/auth/RegisterCompanyForm";
import CompanyDashboard from "./features/company/CompanyDashboard";
import ConsumerProfile from "./features/consumer/ConsumerProfile";
import AdminLayout from "./layouts/AdminLayout";
import CompanyLoyout from "./layouts/CompanyLoyout";
import BankRegisterForm from "./features/admin/BankRegisterForm";
import CompanyLoginRegistion from "./features/company/CompanyLoginRegistion";
import BankList from "./pages/BankList";
import CreateLoanForm from "./features/admin/CreateLoanForm";
import LoanList from "./features/admin/LoanList";
import BankCardForConsumer from "./features/consumer/BankCardForConsumer";
import BanBankListForConsumer from "./features/consumer/BankListForConsumer";
import LoanListForConsumer from "./features/consumer/LoanListForConsumer";
import ApplyLoanByConsumer from "./features/consumer/PersonalInformationStep";
import MultiStepForm from "./features/consumer/MultiStepForm";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HomePageLayout from "./layouts/HomePageLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePageLayout/>}>
          <Route index element={<BanBankListForConsumer/>}/>
          <Route path="user/signup" element={<ConsumerRegisterForm/>}/>
          <Route path="user/login" element={<ConsumerLogin/>}/>
          <Route path="bank/loan/type" element={<LoanListForConsumer/>}/>
          <Route path="user/apply/loan" element={<MultiStepForm/>}/>
          <Route path="user/profile" element={<ConsumerProfile/>}/>
          <Route path="company" element={<CompanyLoyout/>}/>
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="bank/register" element={<BankRegisterForm />} />
            <Route path="bank/list" element={<BankList />} />
            <Route path="loan/create" element={<CreateLoanForm />} />
            <Route path="view/loan" element={<LoanList />} />
            <Route path="companies" element={<CompanyAccessRequests />} />
            <Route path="consumers" element={<ConsumerDataManagement />} />
            <Route path="login" element={<AdminLogin />} />
            {/* Add more nested admin routes here */}
          </Route>
          <Route path="/company" element={<CompanyLoyout />}>
            <Route path="login" element={<CompanyLoginRegistion />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
          </Route>
        </Routes>
      </Router>
      ;
    </>
  );
}

export default App;

// {/* <Router>
//   <Routes>
//     {/* Admin Routes */}
//     <Route path="/admin" element={<AdminLayout />}>
//       <Route path="dashboard" element={<AdminDashboard />} />
//       <Route path="bank/register" element={<BankRegisterForm />} />
//       <Route path="bank/list" element={<BankList />} />
//       <Route path="loan/create" element={<CreateLoanForm />} />
//       <Route path="view/loan" element={<LoanList />} />
//       <Route path="companies" element={<CompanyAccessRequests />} />
//       <Route path="consumers" element={<ConsumerDataManagement />} />
//       <Route path="login" element={<AdminLogin />} />
//       {/* Add more nested admin routes here */}
//     </Route>
//     <Route path="/company" element={<CompanyLoyout />}>
//       <Route path="login" element={<CompanyLoginRegistion />} />
//       <Route path="dashboard" element={<CompanyDashboard />} />
//     </Route>
//   </Routes>
// </Router>; */}
