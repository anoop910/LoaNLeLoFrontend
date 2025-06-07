import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {removeToken} from "../utils/contokenUtils"
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState(false); 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLogin = () => setLogin(true);
  const closeLogin = () => setLogin(false)

  
  const navigate = useNavigate();

  const handleCompanySignup = () => {
    closeModal();
    closeLogin();
    navigate("/company/login");

  }
  const handleConsumerSignup = () => {
    closeModal();
    navigate("/user/signup");

  }
  const handleConsumerLogin = () => {
    closeLogin();
    navigate("/user/login");
  }
  const handleLogOut = () =>{
    localStorage.clear();
    alert("Lou out Successfull!")
    navigate("/")
  }
  const handleUserProfile =()=> {
    navigate("/user/profile")
  }
  if(login){
    return(
       <div onClick={closeLogin} className="fixed inset-0 bg-amber-50/50  backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Login as</h2>
            <div className="flex flex-col space-y-4">
              <button onClick={handleConsumerLogin} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Consumer
              </button>
              <button onClick={handleCompanySignup} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Company
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:underline block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
    )
  }


  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-blue-600">LoanLeLo</div>

        {/* Right: Buttons */}
        <div className="space-x-4">
          <button onClick={openLogin} className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-50">
            Login
          </button>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
           <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Log Out
          </button>
          <button onClick={handleUserProfile}
          className="px-2 py-2 ">
            <FaRegUserCircle size={20} />
          </button>


        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div onClick={closeModal} className="fixed inset-0 bg-amber-50/50  backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up As</h2>
            <div className="flex flex-col space-y-4">
              <button onClick={handleConsumerSignup} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Consumer
              </button>
              <button onClick={handleCompanySignup} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Company
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:underline block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Navbar;
