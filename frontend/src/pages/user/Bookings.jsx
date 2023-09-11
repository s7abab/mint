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

  const [selectedOption, setSelectedOption] = useState("upcoming");

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
      <div className=" p-4 w-screen ">
        <div className="max-w-7xl mx-auto ">
          <h1 className="text-3xl font-semibold mb-6">Your Bookings</h1>

          <div className="mb-4 flex space-x-4 ">
            <button
              className={`${
                selectedOption === "upcoming"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } py-2 px-4 rounded-lg flex-1`}
              onClick={() => setSelectedOption("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${
                selectedOption === "completed"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } py-2 px-4 rounded-lg flex-1`}
              onClick={() => setSelectedOption("completed")}
            >
              Completed
            </button>
            <button
              className={`${
                selectedOption === "canceled"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } py-2 px-4 rounded-lg flex-1`}
              onClick={() => setSelectedOption("canceled")}
            >
              Canceled
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 ">
            {selectedOption === "upcoming" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Upcoming Sessions
                </h2>
                <div className="mb-6 overflow-imp common-vh">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white shadow-md p-4 rounded-lg mb-4 "
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
              </div>
            )}

            {selectedOption === "completed" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Completed Bookings</h2>
                <div className="mb-6  overflow-imp common-vh">
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
              </div>
            )}

            {selectedOption === "canceled" && (
              <div className="">
                <h2 className="text-xl font-semibold mb-4 ">
                  Canceled Bookings
                </h2>
                <div className="mb-6  overflow-imp common-vh">
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
