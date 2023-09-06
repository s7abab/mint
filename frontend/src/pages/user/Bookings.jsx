import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  fetchAllBookings,
} from "../../redux/features/users/userActions";
import moment from "moment";

const Bookings = () => {
  const userId = useSelector((state) => state.auth._id);
  const bookings = useSelector((state) => state.user.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const time = moment().format("HH:mm");
  const date = moment().format("DD-MM-YYYY");

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "booked"
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  );
  const canceledBookings = bookings.filter(
    (booking) =>
      booking.status === "cancelled" || booking.status === "userCancelled"
  );

  const shouldShowCancelButton = (bookingTime, bookingDate) => {
    const Time = moment(time, "HH:mm").add(1, "hours").toISOString();
    const Date = moment(date, "DD-MM-YYYY").toISOString();

    return !(bookingTime < Time && bookingDate <= Date);
  };

  const handleCancelBooking = (_id, counselorId, bookingTime, bookingDate) => {
    if (shouldShowCancelButton(bookingTime, bookingDate)) {
      dispatch(cancelBooking({ _id, counselorId, userId, time, date })).then(
        () => {
          dispatch(fetchAllBookings());
        }
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 w-screen ">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Your Bookings
          </h1>
          <marquee behavior="scroll" direction="left">
          Cancellation Policy: Cancellations are not allowed if the session time is less than 1 hour away
</marquee>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            <div className="mb-6 ">
              <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
              {upcomingBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white shadow-md p-4 rounded-lg mb-4 overflow-y-scroll"
                >
                  <h3 className="text-lg font-semibold">
                    Counseling Session with {booking.counselorName}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Booking id:</strong> {booking._id}
                  </p>

                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {moment(booking.date).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {moment(booking.time).format("hh:mm a")}
                  </p>
                  {shouldShowCancelButton(booking.time, booking.date) && (
                    <button
                      className="bg-red-800 text-white mt-2 py-1 px-4 rounded-md hover:bg-red-600"
                      onClick={() =>
                        handleCancelBooking(
                          booking._id,
                          booking.counselorId,
                          booking.time,
                          booking.date
                        )
                      }
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Completed Bookings */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Completed Bookings</h2>
              {completedBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-green-100 shadow-md p-4 rounded-lg mb-4"
                >
                  <p className="text-gray-600">
                    <strong>Booking id:</strong> {booking._id}
                  </p>
                  <p className="text-gray-600">
                    <strong>Counselor:</strong> {booking.counselorName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {moment(booking.date).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {moment(booking.time).format("hh:mm a")}
                  </p>
                </div>
              ))}
            </div>

            {/* Canceled Bookings */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Canceled Bookings</h2>
              {canceledBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-gray-300 shadow-md p-4 rounded-lg mb-4"
                >
                  <p className="text-gray-600">
                    <strong>Booking id:</strong> {booking._id}
                  </p>
                  <p className="text-gray-600">
                    <strong>Counselor:</strong> {booking.counselorName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {moment(booking.date).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {moment(booking.time).format("hh:mm a")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
