import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  bookAppointment,
  fetchSelectedCounselorForUser,
} from "../../redux/features/users/userActions";
import Layout from "../../components/Layout";
import { DatePicker, Space, TimePicker, Row, Col } from "antd";
import { Button, Card } from "@material-tailwind/react";
import moment from "moment";

const BookingPage = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const userId = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForUser(counselorId));
  }, [dispatch, counselorId, userId]);

  //===============CHECKING AVAILABILTY===========
  const checkAvailability = () => {
    setIsAvailable(true);
  };
  // =================HANDLE BOOKING===============
  const handleBooking = () => {
    dispatch(
      bookAppointment({
        counselorId: counselorId,
        userId: userId,
        counselorInfo: counselor,
        date: date,
        time: time,
      })
    );
  };

  // ===================HANDLE TIME====================
  const handleTime = (time, timeString) => {
    setTime(timeString);
  };

  return (
    <Layout>
      <Card className="w-screen m-5">
        <h1 className="text-2xl font-semibold mb-4">{counselor?.name}</h1>
        <p className="mb-2">Specialization: {counselor?.category}</p>
        <p className="mb-2">Experience: {counselor?.experience} years</p>
        <p className="mb-4">
          Timings: {counselor?.timings[0]} - {counselor?.timings[1]}
        </p>
        <DatePicker
          className="mb-4 mt-4"
          onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
          format="DD-MM-YYYY"
        />
        <TimePicker
          onChange={handleTime}
          format="HH:mm"
          value={time ? moment(time, "HH:mm") : null}
        />
        <Button onClick={checkAvailability} color="indigo" className="mt-4">
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
