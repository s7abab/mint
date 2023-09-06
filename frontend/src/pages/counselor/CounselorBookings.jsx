import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  cancelBooking,
  fetchAllBookings,
  fetchScheduledSlots,
} from "../../redux/features/counselor/counselorActions";

const CounselorBookings = () => {
  const counselorId = useSelector((state) => state.auth._id);
  const bookings = useSelector((state) => state.counselor.bookings);
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

  // ==================== Handle Cancel =====================
  const handleCancel = (_id) => {
    dispatch(cancelBooking({ _id, counselorId })).then(() => {
      dispatch(fetchAllBookings());
    });
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 w-screen">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Your Bookings
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Upcoming Bookings */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
              {upcomingBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white shadow-md p-4 rounded-lg mb-4"
                >
                  <h3 className="text-lg font-semibold">
                    Counseling Session with {booking.userName}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Booking id:</strong> {booking._id}
                  </p>
                  <p className="text-gray-600">
                    <strong>Client:</strong> {booking.userName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {moment(booking.date).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {moment(booking.time).format("hh:mm a")}
                  </p>
                  <button
                    className="bg-red-800 text-white mt-2 py-1 px-4 rounded-md hover:bg-red-600"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel Booking
                  </button>
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
                    <strong>Booking id:</strong> {booking.counselorName} (
                    {booking._id})
                  </p>
                  <p className="text-gray-600">
                    <strong>Client:</strong> {booking.counselorName} (
                    {booking.userName})
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
                    <strong>Client:</strong> {booking.counselorName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {moment(booking.date).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {moment(booking.time).format("hh:mm a")}
                  </p>

                  <p className="text-gray-600">
                    <strong>Cancelled By:</strong>{" "}
                    {booking.status === "cancelled" ? "You" : booking.userName}
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

export default CounselorBookings;
