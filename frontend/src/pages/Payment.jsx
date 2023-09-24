import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import UserPayment from "../components/payments/UserPayments";
import CounselorPayments from "../components/payments/CounselorPayments";

const Payment = () => {
  const role = useSelector((state) => state.auth.role);

  const paymentComponents = {
    user: <UserPayment />,
    counselor: <CounselorPayments />,
  };
  const selectedPaymentComponent = paymentComponents[role];
  return <Layout>{selectedPaymentComponent}</Layout>;
};

export default Payment;
