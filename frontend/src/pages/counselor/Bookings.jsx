import { useEffect, useState } from "react";
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
import { AiFillStar } from "react-icons/ai";
import { useWebRTC } from "../../utils/WebRTCRoom";

const CounselorBookings = () => {
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
    const bDate = moment(bookingDate).format("DD-MM-YYYY");
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).format("HH:mm");
    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bDate === date && minuteDiff < 1) {
      return true;
    }
  };
  // SHOW SESSION COMPLETED BUTTON
  const showCompletedButton = (bookingTime, bookingDate) => {
    const bDate = moment(bookingDate).format("DD-MM-YYYY");
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).add(1, "hours").format("HH:mm");
    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bDate === date && minuteDiff < 1) {
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

  const { handleSubmit } = useWebRTC();
  return (
    <Layout>
      <div className="p-2 w-screen ">
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
                <div className="h-screen overflow-y-scroll">
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
                            onClick={(e) => handleSubmit(e, booking._id)}
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
                <div className="h-screen overflow-y-scroll">
                  {completedBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className=" shadow-md p-4 rounded-lg m-2"
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
                          {moment(booking.time).format("hh:mm a")}
                        </Typography>
                        <div className="flex justify-end">
                          <Typography className="text-gray-600 font-bold">
                            <strong>{booking?.feedback?.feedback}</strong>
                          </Typography>
                        </div>
                        <strong className="flex justify-end">
                          <p>Rating :</p>
                          <p className="mx-1">{booking?.feedback?.rating} </p>
                          <AiFillStar className="mt-1 text-yellow-600" />
                        </strong>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "canceled" && (
              <div>
                <div className="h-screen overflow-y-scroll">
                  {canceledBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className=" shadow-md p-4 rounded-lg m-2"
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
                          {moment(booking.time).format("hh:mm a")}
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
