import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletAmountOfUser } from "../redux/features/users/userActions";
import { Loading } from "../components/Loading";
import { fetchWalletAmountOfCounselor } from "../redux/features/counselor/counselorActions";

const PaymentPage = () => {
  const user = useSelector((state) => state?.user);
  const counselor = useSelector((state) => state?.counselor);
  const { role } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "user") {
      dispatch(fetchWalletAmountOfUser());
    } else if (role === "counselor") {
      dispatch(fetchWalletAmountOfCounselor());
    }
  }, [dispatch, role]);

  const userWalletAmount = user.wallet?.wallet?.balance;
  const userTransactions = user.wallet?.wallet?.transactions;
  const counselorWalletAmount = counselor?.wallet?.wallet?.balance;
  const counselorTransactions = counselor.wallet?.wallet?.incomeTransactions;
  const counselorWithdraw = counselor.wallet?.wallet?.withdrawTransactions;
  const walletAmount =
    role === "user" ? userWalletAmount : counselorWalletAmount;

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
          {role === "counselor" &&
          <button className="bg-gradient-to-tr from-blue-gray-600 via-deep-purple-800 to-green-900 mt-1 border border-x-green-800 hover:bg-orange-800 p-1 px-2 rounded">Withdraw</button>
          }
        </div>

        {role === "user" && (
          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4">Recent Transactions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 h-96 sm:h-64 overflow-imp">
              {userTransactions?.map((data) => (
                <div
                  key={data}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-semibold ${
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
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 h-28 overflow-imp">
              {counselorTransactions?.map((data) => (
                <div
                  key={data}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-semibold ${
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
          <div className="mt-1">
            <h2 className="text-xl font-semibold mb-4">
              Withdrawals
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 h-28 overflow-imp">
              {counselorWithdraw?.map((data) => (
                <div
                  key={data}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-red-500">{data}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PaymentPage;
