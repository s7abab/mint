import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  fetchAllBookings,
  sessionCompleted,
} from "../../redux/features/counselor/counselorActions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import socket from "../../services/socket";

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
    if (bookingDate === Date && minuteDiff < 0) {
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
  // const { socket } = useContext(Global);
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
      <div className="p-2 w-screen">
        <div className="max-w-7xl mx-auto ">
          <div className="mb-4 flex space-x-4">
            <Button
              className={`${
                selectedOption === "upcoming"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } rounded-lg flex-1`}
              onClick={() => setSelectedOption("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              className={`${
                selectedOption === "completed"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } rounded-lg flex-1`}
              onClick={() => setSelectedOption("completed")}
            >
              Completed
            </Button>
            <Button
              className={`${
                selectedOption === "canceled"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              } rounded-lg flex-1`}
              onClick={() => setSelectedOption("canceled")}
            >
              Canceled
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-2">
            {selectedOption === "upcoming" && (
              <div>
                <div className="h-screen">
                  {upcomingBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className="bg-white shadow-md rounded-lg m-2"
                    >
                      <CardBody>
                        <Typography className="text-lg font-semibold">
                          Counseling Session with {booking.userName}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Booking id:</strong> {booking._id}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Date:</strong>{" "}
                          {moment(booking.date).format("DD-MM-YYYY")}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Time:</strong>{" "}
                          {moment(booking.time).format("hh:mm a")}
                        </Typography>
                      </CardBody>
                      <CardFooter>
                        <Button
                          className="bg-red-900"
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
                            Join session
                          </Button>
                        )}
                        {showCompletedButton(booking.time, booking.date) && (
                          <Button
                            className="bg-green-900 m-1"
                            size="sm"
                            onClick={() => handleSessionCompleted(booking._id)}
                          >
                            Session completed ✓
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "completed" && (
              <div>
                <div className="h-screen">
                  {completedBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className="bg-green-100 shadow-md p-4 rounded-lg m-2"
                    >
                      <CardBody>
                        <Typography className="text-gray-600">
                          <strong>Booking id:</strong> {booking._id}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Counselor:</strong> {booking.counselorName}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Date:</strong>{" "}
                          {moment(booking.date).format("DD-MM-YYYY")}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Time:</strong>{" "}
                          {moment(booking.time, "HH:mm").format("hh:mm a")}
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "canceled" && (
              <div className="">
                <div className="h-screen">
                  {canceledBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className="bg-gray-300 shadow-md p-4 rounded-lg m-2"
                    >
                      <CardBody>
                        <Typography className="text-gray-600">
                          <strong>Booking id:</strong> {booking._id}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Counselor:</strong> {booking.counselorName}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Date:</strong>{" "}
                          {moment(booking.date).format("DD-MM-YYYY")}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Time:</strong>{" "}
                          {moment(booking.time, "HH:mm").format("hh:mm a")}
                        </Typography>
                        <Typography className="text-gray-600">
                          <strong>Cancelled By:</strong>{" "}
                          {booking.status === "cancelled"
                            ? "You"
                            : booking.userName}
                        </Typography>
                      </CardBody>
                    </Card>
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
