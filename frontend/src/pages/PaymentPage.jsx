import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletAmountOfUser } from "../redux/features/users/userActions";
import { Loading } from "../components/Loading";
import {
  fetchBankDetails,
  fetchWalletAmountOfCounselor,
  withdrawReq,
} from "../redux/features/counselor/counselorActions";
import BankDetails from "../components/Modals/BankDetails";
import WithdrawConfirm from "../components/Modals/WithdrawConfirm";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const user = useSelector((state) => state?.user);
  const counselor = useSelector((state) => state?.counselor);
  const { role } = useSelector((state) => state?.auth);
  const bankAc = useSelector((state) => state?.counselor?.bankAC?.bankAC);

  const dispatch = useDispatch();
  const [view, setView] = useState("transactions");

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleConfirmModal = () => {
    if(walletAmount<=0){
      return toast.error("Insufficient balance")
    }
    if(!bankAc){
      return handleModal()
    }
    setConfirmModal(!confirmModal);
  };

  useEffect(() => {
    if (role === "user") {
      dispatch(fetchWalletAmountOfUser());
    } else if (role === "counselor") {
      dispatch(fetchWalletAmountOfCounselor());
      dispatch(fetchBankDetails());
    }
  }, [dispatch, role]);

  const userWalletAmount = user.wallet?.wallet?.balance;
  const userTransactions = user.wallet?.wallet?.transactions;
  const counselorWalletAmount = counselor?.wallet?.wallet?.balance;
  const counselorTransactions = counselor.wallet?.wallet?.incomeTransactions;
  const counselorWithdraw = counselor.wallet?.wallet?.withdrawTransactions;
  const walletAmount =
    role === "user" ? userWalletAmount : counselorWalletAmount;

  const handleWithdrawReq = () => {
    
    dispatch(withdrawReq()).then(() => {
      dispatch(fetchWalletAmountOfCounselor()).then(() => {
        handleConfirmModal();
      });
    });
  };

  return (
    <Layout>
      {user && user.loading && <Loading />}
      {counselor && counselor.loading && <Loading />}
      <div className="container mx-auto p-6 ">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg p-8 shadow-lg text-white">
          <h1 className="text-4xl font-semibold mb-4">My Wallet</h1>
          <div className="flex items-center text-2xl">
            <FaRupeeSign className="mr-2 text-xl" />
            <p className="font-semibold">{walletAmount}</p>
          </div>
          {role === "counselor" && (
            <div className="flex justify-between">
              <button
                className="bg-black px-3 py-2 mt-2 rounded-3xl"
                onClick={handleConfirmModal}
              >
                Withdraw
              </button>
              <button onClick={handleModal}>Change bank AC details</button>
            </div>
          )}
        </div>

        {role === "user" && view === "transactions" && (
          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4">Recent Transactions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-imp">
              {userTransactions?.map((data, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-4 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-semibold text-xs ${
                        data.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {data}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {role === "counselor" && (
          <div className="flex gap-4 mb-2 mt-3">
            <button
              className="bg-black hover:bg-blue-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => setView("transactions")} // Set the view to transactions when button is clicked
            >
              Recent Transactions
            </button>
            <button
              className="bg-black hover:bg-blue-gray-900 text-white font-bold py-2 px-4 rounded "
              onClick={() => setView("withdrawals")} // Set the view to withdrawals when button is clicked
            >
              Withdrawals
            </button>
          </div>
        )}
        {role === "counselor" && view === "transactions" && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-imp">
              {counselorTransactions?.map((data, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 ">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-semibold text-xs ${
                        data.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {data}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {role === "counselor" && view === "withdrawals" && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4 ">Withdrawals</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-imp">
              {counselorWithdraw?.map((data, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center text-center">
                    <span className="font-semibold text-red-500 text-xs">{data}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isModal && <BankDetails close={handleModal} />}
      {confirmModal && (
        <WithdrawConfirm
          close={handleConfirmModal}
          confirm={handleWithdrawReq}
        />
      )}
    </Layout>
  );
};

export default PaymentPage;
