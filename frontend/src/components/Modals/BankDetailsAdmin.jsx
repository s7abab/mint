import { Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const BankDetailsAdmin = ({ close, confirm }) => {
  const withdrawalReq = useSelector((state) => state.admin.withdrawalReq);
  return (
    <>
      <div className="absolute h-64 top-20 inset-0 flex  justify-center ">
        <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
          <div className="flex">
            <p className="cursor-pointer" onClick={close}>
              X
            </p>
          </div>
          <div className="flex-col ml-5">
            <div className="mt-4 font-bold text-lg">Name: {withdrawalReq[0].bankAC.name}</div>
            <div className="mt-3 font-bold text-lg">Ifsc: {withdrawalReq[0].bankAC.ifsc}</div>
            <div className="mt-3 font-bold text-lg mb-5">Ac No: {withdrawalReq[0].bankAC.acNo}</div>
            <Button onClick={confirm}>Settle</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetailsAdmin;
