import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../../redux/features/users/userActions";
import { Button } from "@material-tailwind/react";

const BookingModal = ({ close }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [note, setNote] = useState("");
  const selectedSlot = useSelector((state) => state.user.selectedSlot);
  const user = useSelector((state) => state.auth._id);
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const dispatch = useDispatch();

  // =================HANDLE BOOKING===============
  const handleBooking = (e) => {
    e.preventDefault();
    // if ( ) {
    //   toast.error("Fill all the fields");
    //   return;
    // }
    dispatch(
      bookAppointment({
        counselorId: counselor._id,
        userId: user,
        counselorName: counselor.name,
        userName: name,
        userAge: age,
        note: note,
        date: selectedSlot.date,
        time: selectedSlot.time,
      })
    );
    close();
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <div className="flex">
            <p className="cursor-pointer" onClick={close}>
              X
            </p>
            <h2 className="mx-5 text-2xl font-semibold mb-4">
              Fill Your Details
            </h2>
          </div>
          <form action="" onSubmit={handleBooking}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-600 font-medium">
                Name:
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-600 font-medium">
                Age:
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-600 font-medium">
                Note:
              </label>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                id="w3review"
                name="w3review"
                rows="4"
                cols="40"
              />
            </div>
            <Button type="submit">Book</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
