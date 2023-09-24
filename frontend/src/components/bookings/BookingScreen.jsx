import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  fetchSlots,
  fetchWalletAmountOfUser,
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
  const [useWallet, setUseWallet] = useState(false);
  const wallet = useSelector((state) => state.user.wallet);
  const selectedSlot = useSelector((state) => state.user.selectedSlot);
  const user = useSelector((state) => state.auth._id);
  const counselor = useSelector((state) => state.user.selectedCounselor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =================HANDLE BOOKING===============
  // If full amount in wallet
  const bookingUsingWallet = async () => {
    try {
      await dispatch(
        bookAppointment({
          counselorId: counselor._id,
          userId: user,
          userName: name,
          userAge: age,
          note: note,
          date: selectedSlot.date,
          time: selectedSlot.time,
          amount: counselor.fee,
          walletAmount: counselor.fee,
        })
      ).then(() => {
        fetchSlots();
      });
      navigate("/bookings");
      close();
    } catch (error) {
      console.log(error);
    }
  };
  // If wallet have money but not full
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
              walletAmount: wallet.wallet.balance,
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
    let amountToPay = counselor.fee;

    if (!name || !age || !note) {
      return toast.error("Name, Age, and Note are required");
    }
    if (useWallet) {
      if (wallet.wallet.balance >= counselor.fee) {
        return bookingUsingWallet();
      }
      amountToPay = counselor.fee - wallet.wallet.balance;
    }
    try {
      const { data } = await Api.post("/user/payment", {
        amount: amountToPay,
      });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchWalletAmountOfUser()); //fetch wallet
  }, [dispatch]);
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
          {wallet && (
            <div className="flex gap-2 justify-center">
              <label htmlFor="checkbox" className="text-[15px]">
                Use wallet{" "}
              </label>
              <input
                type="checkbox"
                id="checkbox"
                value={useWallet}
                onChange={() => setUseWallet(!useWallet)}
              />
              <h1 className="bg-blue-gray-200 w-12 text-center rounded">
                {wallet && wallet?.wallet?.balance}
              </h1>
            </div>
          )}
          <div className="flex justify-center mt-3">
            <Button onClick={handleBooking}> Pay </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingScreen;
