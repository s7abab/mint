import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlot,
  fetchScheduledSlots,
} from "../../redux/features/counselor/counselorActions";
import toast from "react-hot-toast";
import moment from "moment";

const CreateSlot = ({ close }) => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleCreate = async () => {
    try {
      if (!date) {
        return toast.error("Select Date");
      }
      if (!time) {
        return toast.error("Select Time");
      }
      await dispatch(createSlot({ date, time, counselorId }));
      await dispatch(fetchScheduledSlots(counselorId));
      close();
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while creating the slot.");
    }
  };

  const handleDate = (e) => {
    const selectedDate = e.target.value;

    const formattedDate = moment(selectedDate).format("DD-MM-YYYY");
    setDate(formattedDate);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        {console.log(date)}
        <div className="flex">
          <p className="cursor-pointer" onClick={close}>
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
              onChange={handleDate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="date"
            />
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
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlot;
