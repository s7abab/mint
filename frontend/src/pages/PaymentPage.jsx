import React from 'react'
import Layout from"../components/Layout"
import UserPayment from '../components/payments/UserPayments'
import CounselorPayments from '../components/payments/CounselorPayments'
import { useSelector } from 'react-redux'

const PaymentPage = () => {
  const role = useSelector(state=>state.auth.role)
  return (
    <>
    <Layout>
      {role === "user" &&
      <UserPayment />
      }
      {role === "counselor" &&
      <CounselorPayments />
      }
    </Layout>
    </>
  )
}

export default PaymentPage