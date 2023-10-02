import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import {
  changeKycStatus,
  fetchAllKycs,
} from "../../redux/features/admin/adminActions";

const ViewKycModal = ({ close, kyc }) => {
  const dispatch = useDispatch();

  const handleSubmit = (status) => {
    dispatch(
      changeKycStatus({
        kycId: kyc._id,
        status,
        counselorId: kyc.counselorId._id,
      })
    )
      .then(() => {
        dispatch(fetchAllKycs());
      })
      .then(() => close());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-t-lg">
          <h2 className="text-xl font-semibold">Verify KYC</h2>
          <button className="text-xl" onClick={close}>
            X
          </button>
        </div>
        <img src={`http://localhost:8080${kyc.identityProof}`} alt="" />
        <div className="p-4 flex justify-center gap-5">
          <Button
            onClick={() => {
              handleSubmit("approved");
            }}
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              handleSubmit("rejected");
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewKycModal;
