import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  bookAppointment,
  fetchSelectedCounselorForUser,
} from "../../redux/features/users/userActions";
import { checkAvailability } from "../../redux/features/users/userActions";
import Layout from "../../components/Layout";
import { DatePicker } from "antd";
import { Button, Card } from "@material-tailwind/react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import { bookingNotAvailable } from "../../redux/features/users/userSlice";

const BookingPage = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState("00:00");
  const [note, setNote] = useState("");
  const isAvailable = useSelector((state) => state.user.isbookingAvailable);
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForUser(counselorId));
  }, [dispatch, counselorId, user]);

  //===============CHECKING AVAILABILTY===========
  const checkingAvailability = () => {
    dispatch(checkAvailability({ time, date, counselorId }));
  };
  // =================HANDLE BOOKING===============
  const handleBooking = () => {
    if (!note || !date || !time) {
      return toast.error("Fill all the fields");
    }
    dispatch(
      bookAppointment({
        counselorId: counselorId,
        userId: user._id,
        counselorInfo: counselor,
        userInfo: user.user,
        note: note,
        date: date,
        time: time,
      })
    );
  };

  return (
    <Layout>
      <Card className="w-screen m-5">
        <h1 className="text-2xl font-semibold mb-4">{counselor?.name}</h1>
        <p className="mb-2">Specialization: {counselor?.category}</p>
        <p className="mb-2">Experience: {counselor?.experience} years</p>
        <p className="mb-4">
          Timings:{" "}
          {counselor
            ? moment(counselor.timings[0], "HH:mm").format("hh:mm A")
            : ""}{" "}
          -{" "}
          {counselor
            ? moment(counselor.timings[1], "HH:mm").format("hh:mm A")
            : ""}
        </p>
        <label htmlFor="">Add note</label>
        <TextArea onChange={(e) => setNote(e.target.value)} rows={4} />
        <DatePicker
          className="mb-4 mt-4"
          onChange={(value) => {
            setDate(moment(value).format("DD-MM-YYYY"));
            dispatch(bookingNotAvailable())
          }}
          format="DD-MM-YYYY"
        />
        <label htmlFor="time" className="text-sm font-medium text-gray-700">
          Select Time:
        </label>
        <input
          id="time"
          type="time"
          name="endtime"
          defaultValue={"00:00"}
          onChange={(e) => {
            setTime(e.target.value);
            dispatch(bookingNotAvailable())
            
          }}
          className="w-full p-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-gray-700"
        />
        <Button onClick={checkingAvailability} color="indigo" className="mt-4">
          Check Availability
        </Button>
        {isAvailable && (
          <Button onClick={handleBooking} className="mt-4">
            Book Appointment
          </Button>
        )}
      </Card>
    </Layout>
  );
};

export default BookingPage;
