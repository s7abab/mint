import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWalletAmountOfCounselor, kycRequest } from "../../redux/features/counselor/counselorActions";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

const KycModal = ({ close }) => {
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(""); 
  const dispatch = useDispatch();

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (file && doc) {
      dispatch(kycRequest({file, doc})).then(()=>{
        dispatch(fetchWalletAmountOfCounselor())
      }).then(()=>{
        close()
      })
    } else {
      toast.error("Please select a file and a document.");
    }
  };

  const handleDocumentChange = (e) => {
    setDoc(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-t-lg">
          <h2 className="text-xl font-semibold">KYC Verification</h2>
          <button className="text-xl" onClick={close}>
            X
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleKycSubmit}>
            <label className="block mb-2 font-semibold">
              Please upload any identity proof
            </label>
            <select
              id="documentSelect"
              name="document"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleDocumentChange}
              value={doc}
            >
              <option value="" disabled>
                Select Document
              </option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="PanCard">PanCard</option>
              <option value="VoterId">VoterId</option>
              <option value="Passport">Passport</option>
            </select>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              type="file"
              name="image"
              accept="image/*"
              id="photo-upload"
              className="w-full border p-2 mt-10 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KycModal;
