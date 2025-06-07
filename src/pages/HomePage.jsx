import React from 'react'
import Navbar from '../components/Navbar'
import BankListForConsumer from '../features/consumer/BankListForConsumer'

const HomePage = () => {
  return (
   <>
   <Navbar/>
   <BankListForConsumer/>
   </>
  )
}

export default HomePage