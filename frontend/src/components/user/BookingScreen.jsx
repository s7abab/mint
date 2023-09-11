import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  fetchSlots,
} from "../../redux/features/users/userActions";
import { Button } from "@material-tailwind/react";
import Api from "../../services/axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const BookingScreen = ({ close }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [note, setNote] = useState("");
  const [Razorpay] = useRazorpay();
  const [orderId, setOrderId] = useState();

  const selectedSlot = useSelector((state) => state.user.selectedSlot);
  const user = useSelector((state) => state.auth._id);
  const counselor = useSelector((state) => state.user.selectedCounselor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =================HANDLE BOOKING===============

  const initPayment = (data) => {
    setOrderId(data.id);
    const options = {
      key: import.meta.env.VITE_KEY_ID,
      amount: data.fee,
      currency: data.currency,
      name: counselor.name,
      order_id: data.id,

      handler: async (response) => {
        try {
          dispatch(
            bookAppointment({
              counselorId: counselor._id,
              userId: user,
              userName: name,
              userAge: age,
              note: note,
              date: selectedSlot.date,
              time: selectedSlot.time,
              razorpay_order_id: data.id,
              amount: counselor.fee,
            })
          ).then(() => {
            fetchSlots();
          });
          navigate("/bookings");
          close();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  const handleBooking = async () => {
    if (!name || !age || !note) {
      return toast.error("Name, Age, and Note are required");
    }
    try {
      const { data } = await Api.post("/user/payment", {
        amount: counselor.fee,
      });
      console.log(data);
      initPayment(data.data);
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
            <h2 className="mx-5 text-2xl font-semibold mb-4">
              Fill Your Details
            </h2>
          </div>
          <form action="">
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
          </form>
          <Button onClick={handleBooking}> Pay </Button>
        </div>
      </div>
    </>
  );
};

export default BookingScreen;
