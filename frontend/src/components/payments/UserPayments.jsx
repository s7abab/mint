import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading";
import { fetchWalletAmountOfUser } from "../../redux/features/users/userActions";

const CounselorPayments = () => {
  const wallet = useSelector((state) => state?.user?.wallet?.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWalletAmountOfUser());
  }, []);

  if (!wallet) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className=" bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">My Wallet</h1>
          <p className="text-2xl mt-2">₹{wallet.balance}</p>
        </div>
      </div>
      <div className="m-2">
        {wallet?.transactions?.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 m-2"
          >
            <div
              className={`text-lg font-semibold ${
                data.amount < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              Amount: {data?.amount}
            </div>

            <div className="text-sm text-gray-600">Date: {data?.date}</div>
            <div className="text-sm text-gray-600">
              Booking ID: {data?.bookingId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorPayments;
