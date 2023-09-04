import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlots } from "../../redux/features/users/userActions";
import moment from "moment";
import { selectSlot } from "../../redux/features/users/userSlice";
import { Button } from "@material-tailwind/react";
import BookingModal from "./bookingModal";

const TimeSlots = ({ counselorId }) => {
  const slots = useSelector((state) => state.user.slots);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const handleSlotSelection = (slotId) => {
    setSelected(slotId);
  };

  const handleClose = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchSlots({ counselorId }));
  }, [dispatch, counselorId]);

  return (
    <div className="container mx-auto mt-4 p-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Available Times
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className={`p-2 border rounded cursor-pointer ${
              selected === slot._id
                ? "bg-indigo-600 text-white shadow-md transform scale-105 transition-transform"
                : slot.status === "booked"
                ? "bg-red-200 cursor-not-allowed"
                : slot.status === "available"
                ? "bg-white hover:bg-indigo-100 shadow-sm transform hover:scale-105 transition-transform"
                : "bg-gray-200 cursor-not-allowed"
            }`}
            onClick={() => {
              if (slot.status === "pending") {
                handleSlotSelection(slot._id);
                dispatch(selectSlot({ time: slot.time, date: slot.date }));
              }
            }}
          >
            <p className="text-md">
              {moment(slot.time).format("h:mm a")} -{" "}
              {moment(slot.time).add(1, "hours").format("h:mm a")}
            </p>
            {slot.status === "pending" ? (
              <p
                className={`text-sm mt-1 ${
                  selected === slot._id ? "text-indigo-600" : ""
                }`}
              >
                {selected === slot._id ? "Selected" : "Available"}
              </p>
            ) : (
              <p className="text-sm mt-1 text-red-500">Booked</p>
            )}
          </div>
        ))}
      </div>
      {selected !== null && <Button className="mt-5" onClick={()=>setModal(!modal)}>Book Appointment</Button>}
      {modal && <BookingModal close={handleClose} />}
    </div>
  );
};

export default TimeSlots;
