import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createSlot } from "../../redux/features/counselor/counselorActions";
import toast from "react-hot-toast";

const CreateSlot = ({ close }) => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleCreate = () => {
    if(!date){
        return toast.error("Select Date")
    }
    if(!time){
        return toast.error("Select Time")
    }
    dispatch(createSlot({ date, time, counselorId }));
    close(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <div className="flex">
          <p className="cursor-pointer" onClick={() => close(false)}>
            X
          </p>
          <h2 className="mx-5 text-2xl font-semibold mb-4">Create a Slot</h2>
        </div>
        <form action="">
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-600 font-medium">
              Date:
            </label>
            <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="date"
            />
            {console.log(date)}
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-600 font-medium">
              Time:
            </label>
            <input
              defaultValue={"00:00"}
              onChange={(e) => setTime(e.target.value)}
              id="time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="time"
            />
          </div>
          <div className="text-right">
            <Button onClick={handleCreate}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlot;
