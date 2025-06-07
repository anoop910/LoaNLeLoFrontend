import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from "react-router-dom";



const AdminLayout = () => {

   

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className='fixed'>
      <AdminSidebar />
      </div>
      {/* Main Content */}
      
    
      
      <div className="flex-1 pl-6 bg-gray-50 min-h-screen">
      <div className='ml-64'>
        <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout