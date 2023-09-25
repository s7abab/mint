import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  deleteSlot,
  fetchScheduledSlots,
} from "../../redux/features/counselor/counselorActions";
import moment from "moment";
import toast from "react-hot-toast";

const ScheduledSlots = () => {
  const [selectedOption, setSelectedOption] = useState("pending");
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const slots = useSelector((state) => state.counselor.slots);

  useEffect(() => {
    dispatch(fetchScheduledSlots(counselorId));
  }, [counselorId, dispatch, slots.length]);

  const handleDelete = (_id, counselorId) => {
    dispatch(deleteSlot({ _id, counselorId })).then(() => {
      dispatch(fetchScheduledSlots(counselorId));
    });
  };

  const handleCancel = async (_id, counselorId) => {
    try {
      await dispatch(cancelBooking({ _id, counselorId }));
      await dispatch(fetchScheduledSlots(counselorId));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const pendingBookings = slots.filter((data) => data.status === "pending");
  const bookedSlots = slots.filter((data) => data.status === "booked");

  const filteredSlots =
    selectedOption === "pending" ? pendingBookings : bookedSlots;

  return (
    <Card className=" w-full mt-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <Button
              className={`${
                selectedOption === "pending"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedOption("pending")}
            >
              Pending
            </Button>
            <Button
              className={`${
                selectedOption === "booked"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-700"
              } `}
              onClick={() => setSelectedOption("booked")}
            >
              Booked
            </Button>
          </div>
          <Section
            title={selectedOption === "pending" ? "Pending Bookings" : "Booked Slots"}
            slots={filteredSlots}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Card>
  );
};

const Section = ({ title, slots, onCancel, onDelete }) => {
  return (
    <div className="p-2 bg-white rounded-lg shadow-lg h-screen w-screen">
      <Typography variant="h6" color="blue-gray" className="font-semibold mb-2">
        {title}
      </Typography>
      <div className="grid gap-4 ">
        {slots.map((data) => (
          <div
            key={data._id}
            className={`border p-4 rounded-lg ${
              data.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : data.status === "booked"
                ? " text-green-600"
                : ""
            }`}
          >
            <Typography variant="small" className="font-normal">
              Date: {moment(data.date).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="small" className="font-normal">
              Time: {moment(data.time).subtract(5.5, "hours").format("h:mm a")} -{" "}
              {moment(data.time).subtract(4.5, "hours").format("h:mm a")}
            </Typography>
            <div className="flex items-center mt-4">
              <Typography
                variant="small"
                className={`font-normal mr-2 ${
                  data.status === "booked"
                    ? "text-green-600"
                    : data.status === "cancelled"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {data.status}
              </Typography>
              {data.status === "pending" && (
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(data._id, data.counselorId)}
                >
                  Delete
                </button>
              )}
              {data.status === "booked" && (
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onCancel(data._id, data.counselorId)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledSlots;
