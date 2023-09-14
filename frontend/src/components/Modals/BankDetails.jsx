import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBankDetails,
  fetchBankDetails,
} from "../../redux/features/counselor/counselorActions";
import toast from "react-hot-toast";

const BankDetails = ({ close }) => {
  const bankAc = useSelector((state) => state?.counselor?.bankAC?.bankAC);
  const [acNo, setAcNo] = useState(bankAc?.acNo || "");
  const [racNo, setRacNo] = useState(bankAc?.acNo || "");
  const [ifsc, setIfsc] = useState(bankAc?.ifsc || "");
  const [name, setName] = useState(bankAc?.name || "");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (acNo !== racNo) {
      return toast.error("Ac no not match");
    }
    try {
      await dispatch(changeBankDetails({ acNo, ifsc, name }));
      await dispatch(fetchBankDetails());
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center ">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <div className="flex">
            <p className="cursor-pointer" onClick={close}>
              X
            </p>
            <h2 className="mx-5 text-2xl font-semibold mb-4">Bank Details</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date" className="block text-gray-600 font-medium">
              Ac Number:
            </label>
            <input
              type="text"
              value={acNo}
              onChange={(e) => setAcNo(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="date" className="block text-gray-600 font-medium">
              Repeat Ac Number:
            </label>
            <input
              type="password"
              value={racNo}
              onChange={(e) => setRacNo(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="date" className="block text-gray-600 font-medium">
              IFSC:
            </label>
            <input
              type="text"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="date" className="block text-gray-600 font-medium">
              AC Holder Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
