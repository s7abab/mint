import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../socket/Socket";
import Layout from "../../components/Layout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  fetchAllBookings,
  fetchScheduledSlots,
  sessionCompleted,
} from "../../redux/features/counselor/counselorActions";
import { Button } from "@material-tailwind/react";

const CounselorBookings = () => {
  const counselorId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.counselor.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const [selectedOption, setSelectedOption] = useState("upcoming");

  const time = moment().format("HH:mm");
  const date = moment().format("DD-MM-YYYY");
  const isoTime = moment().toISOString();
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
  // SHOW SESSION START BUTTON
  const showSessionStartButton = (bookingTime, bookingDate) => {
    const Date = moment(date, "DD-MM-YYYY").toISOString();
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).format("HH:mm");
    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bookingDate === Date && minuteDiff < 60) {
      return true;
    }
  };
  // SHOW SESSION COMPLETED BUTTON
  const showCompletedButton = (bookingTime, bookingDate) => {
    const Date = moment(date, "DD-MM-YYYY").toISOString();
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).add(1, "hours").format("HH:mm");
    if (bookingDate <= Date && bTime < Time) {
      return true;
    }
  };
  // =============== Handle Session Completed ===============
  const handleSessionCompleted = (bookingId) => {
    dispatch(sessionCompleted(bookingId)).then(() => {
      dispatch(fetchAllBookings());
    });
  };
  // ==================== Handle Cancel =====================
  const handleCancelBooking = (_id, counselorId, time, date) => {
    dispatch(cancelBooking({ _id, counselorId })).then(() => {
      dispatch(fetchAllBookings());
    });
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
      <div className="p-4 w-screen">
        <div className="max-w-7xl mx-auto ">
          <h1 className="text-3xl font-semibold mb-6">Your Bookings</h1>

          <div className="mb-4 flex space-x-4">
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

          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedOption === "upcoming" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Upcoming Sessions
                </h2>
                <div className="mb-6 common-vh overflow-imp">
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
                        <strong>Date:</strong>{" "}
                        {moment(booking.date).format("DD-MM-YYYY")}
                      </p>
                      <p className="text-gray-600">
                        <strong>Time:</strong>{" "}
                        {moment(booking.time).format("hh:mm a")}
                      </p>

                      <Button
                        className="bg-red-800"
                        size="sm"
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
                      </Button>
                      {showSessionStartButton(booking.time, booking.date) && (
                        <Button
                          className="mx-4"
                          size="sm"
                          onClick={(e) => handleSubmitForm(e, booking._id)}
                        >
                          Start session
                        </Button>
                      )}
                      {showCompletedButton(booking.time, booking.date) && (
                        <Button
                          className="bg-green-700"
                          size="sm"
                          onClick={()=>handleSessionCompleted(booking._id)}
                        >
                          Session completed ✓
                        </Button>
                      )}
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
                <div className="mb-6 common-vh overflow-imp">
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
                        {moment(booking.time, "HH:mm").format("hh:mm a")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "canceled" && (
              <div className="">
                <h2 className="text-xl font-semibold mb-4">
                  Canceled Bookings
                </h2>
                <div className="mb-6 common-vh overflow-imp">
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
                        {moment(booking.time, "HH:mm").format("hh:mm a")}
                      </p>
                      <p className="text-gray-600">
                        <strong>Cancelled By:</strong>{" "}
                        {booking.status === "cancelled"
                          ? "You"
                          : booking.userName}
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

export default CounselorBookings;
