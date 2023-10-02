import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading";
import {
  fetchBankDetails,
  fetchWalletAmountOfCounselor,
  withdrawReq,
  kycRequest,
} from "../../redux/features/counselor/counselorActions";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import BankDetails from "../Modals/BankDetails";
import WithdrawConfirm from "../Modals/WithdrawConfirm";
import KycModal from "../Modals/KycModal";

const CounselorPayments = () => {
  const [modal, setModal] = useState(false);
  const [bankModal, setBankModal] = useState(false);
  const [kycModal, setKycModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recent Transactions");

  const wallet = useSelector((state) => state?.counselor?.wallet?.wallet);
  const bankAc = useSelector((state) => state?.counselor?.bankAC?.bankAC);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWalletAmountOfCounselor());
    dispatch(fetchBankDetails());
  }, [dispatch]);

  if (!wallet) {
    return <Loading />;
  }

  const handleWithdrawModal = () => {
    if (wallet?.kycSend) {
      return toast(
        "KYC verification in progress. Please wait while we verify your information"
      );
    }
    if (!wallet?.isKyc) {
      return setKycModal(!kycModal);
    }
    setModal(!modal);
  };

  const handleChangeAc = () => {
    setBankModal(!bankModal);
  };

  const handleWithdraw = () => {
    if (!bankAc) {
      setBankModal(!bankModal);
    }
    if (wallet.balance <= 0) {
      return toast.error("Wallet does not have sufficient balance");
    }
    dispatch(withdrawReq());
    setModal(!modal);
  };

  const handleKycModal = () => {
    setKycModal(!kycModal);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">My Wallet</h1>
          <p className="text-2xl mt-2">₹{wallet.balance}</p>
        </div>
      </div>
      <div className="m-2">
        <div className="flex justify-center items-center mb-4 space-x-4">
          <Button onClick={handleWithdrawModal} size="sm">
            Withdraw
          </Button>
          <Button onClick={handleChangeAc} size="sm">
            Change bank details
          </Button>
        </div>

        <div className="mb-4">
          <select
            id="paymentType"
            name="paymentType"
            className="mt-1 block w-full p-2 border border-gray-300 text-gray-800"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Recent Transactions">Recent Transactions</option>
            <option value="Withdrawals">Withdrawals</option>
          </select>
        </div>

        {selectedOption === "Recent Transactions" && (
          <>
            {wallet?.incomeTransactions?.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 mb-4"
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
          </>
        )}

        {selectedOption === "Withdrawals" && (
          <>
            {wallet?.withdrawTransactions?.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 mb-4"
              >
                <div
                  className={`text-lg font-semibold ${
                    data.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Amount: {data?.amount}
                </div>
                <div className="text-sm text-gray-600">Date: {data?.date}</div>
              </div>
            ))}
          </>
        )}
      </div>
      {kycModal && <KycModal close={handleKycModal} />}
      {bankModal && <BankDetails close={handleChangeAc} />}
      {modal && (
        <WithdrawConfirm close={handleWithdrawModal} confirm={handleWithdraw} />
      )}
    </div>
  );
};

export default CounselorPayments;
