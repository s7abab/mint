import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlots } from "../../redux/features/users/userActions";
import moment from "moment";
import { selectSlot } from "../../redux/features/users/userSlice";
import { Button } from "@material-tailwind/react";
import BookingScreen from "../bookings/BookingScreen";

const TimeSlots = ({ counselorId }) => {
  const slots = useSelector((state) => state.user.slots);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const handleSlotSelection = (slotId) => {
    setSelected(slotId);
  };

  const handleClose = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchSlots({ counselorId }));
  }, [dispatch, counselorId]);

  // Filter slots by selected day
  const filteredSlots = selectedDay
    ? slots.filter((slot) => moment(slot.date).isSame(selectedDay, "day"))
    : slots;

  return (
    <div className="container mx-auto mt-4 p-2">
      <div className="mb-2">
        <label className="mr-2 ">Select a Day:</label>
        <input
          type="date"
          className="p-2 border border-black mb-2"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
        {filteredSlots.length===0 && (
          <h1 className="font-bold text-red-900 text-center">
            Slots were not scheduled by the counselor
          </h1>
        )}
        {filteredSlots.map((slot) => (
          <div
            key={slot._id}
            className={`p-2 border rounded cursor-pointer ${
              selected === slot._id
                ? "bg-indigo-600 text-white shadow-md transform scale-105 transition-transform"
                : slot.status === "booked"
                ? "bg-red-200 cursor-not-allowed"
                : slot.status === "available"
                ? "bg-white hover:bg-indigo-100 shadow-sm transform hover:scale-105 transition-transform"
                : "bg-blue-gray-100  cursor-not-allowed"
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
            <p className="text-md mt-1">
              {moment(slot.date).format("DD-MM-YYYY")}
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
      {selected !== null && (
        <Button className="mt-5" onClick={() => setModal(!modal)}>
          Book Appointment
        </Button>
      )}
      {modal && <BookingScreen close={handleClose} />}
    </div>
  );
};

export default TimeSlots;
