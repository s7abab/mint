import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  fetchAllBookings,
} from "../../redux/features/users/userActions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Global } from "../../socket/Socket";

const Bookings = () => {
  const userId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.auth.user);
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
    const Date = moment(date, "DD-MM-YYYY").toISOString();

    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).format("HH:mm");

    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bookingDate > Date) {
      return true;
    }
    if (minuteDiff > 60) {
      return true;
    }
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

  //=================== VIDEO CALL START =========================/
  const navigate = useNavigate();
  const { socket } = useContext(Global);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("123");

  const handleSubmitForm = useCallback(
    (e, roomId) => {
      e.preventDefault();
      socket.emit("room:join", { email: user, room: roomId });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  //=================== VIDEO CALL START =========================/

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
                      <div className=" flex flex-col">
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
                        {shouldShowCancelButton(booking.time, booking.date) && (
                          <button
                            className="bg-green-800 text-white mt-2 py-1 px-4 rounded-md hover:bg-green-600"
                            onClick={(e) => handleSubmitForm(e, booking._id)}
                          >
                            Start Session
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "completed" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Completed Bookings
                </h2>
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
