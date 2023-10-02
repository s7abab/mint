import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  fetchAllBookings,
} from "../../redux/features/users/userActions";
import moment from "moment";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import { useWebRTC } from "../../utils/WebRTCRoom"

const Bookings = () => {
  const [modal, setModal] = useState(false);
  const [selectedBookId, setselectedBookId] = useState("");
  const [selelectedBooking, setSelectedBooking] = useState("");
  const userId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.user.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const [selectedOption, setSelectedOption] = useState("upcoming");

  const time = moment().format("HH:mm");
  const date = moment().format("DD-MM-YYYY")

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

  const isoTime = moment().toISOString();
  // Cancel only possible atleast 1 hr before
  const shouldShowCancelButton = (bookingTime, bookingDate) => {
    const bDate = moment(bookingDate).format("DD-MM-YYYY")
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).format("HH:mm");
    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bDate > date) {
      return true;
    }
    if(bDate < date){
      return false
    }
    if (minuteDiff > 60) {
      return true;
    }
  };
  // Show session start button
  const showSessionStartButton = (bookingTime, bookingDate) => {
    const bDate = moment(bookingDate).format("DD-MM-YYYY")
    const Time = moment(time, "HH:mm").format("HH:mm");
    const bTime = moment(bookingTime).format("HH:mm");
    const minuteDiff = moment(bTime, "HH:mm").diff(
      moment(Time, "HH:mm"),
      "minutes"
    );
    if (bDate === date && minuteDiff<1) {
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

  const handleModalClose = () => {
    setModal(!modal);
  };

  const { handleSubmit } = useWebRTC();
  
  return (
    <Layout>
      <div className=" p-2 w-screen ">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex space-x-4 ">
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

          <div className="h-screen overflow-y-scroll rounded-lg shadow-md p-2 ">
            {selectedOption === "upcoming" && (
              <div>
                <div className="mb-6 h-screen">
                  {upcomingBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className="bg-white shadow-md p-2 rounded-lg m-2"
                    >
                      <CardBody key={booking._id}>
                        <Typography className="text-lg font-semibold">
                          Counseling Session with {booking.counselorName}
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
                        {shouldShowCancelButton(booking.time, booking.date) && (
                          <Button
                          size="sm"
                            className="bg-red-900 text-white  hover:bg-red-600"
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
                        )}
                        {showSessionStartButton(booking.time, booking.date) && (
                          <Button
                            size="sm"
                            onClick={(e) => handleSubmit(e, booking._id)}
                          >
                            Join Session
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
                <div className="mb-6 h-screen overflow-y-scroll">
                  {completedBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className="shadow-md p-4 rounded-lg mb-4"
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
                      </CardBody>
                      <CardFooter>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            handleModalClose(e),
                              setselectedBookId(booking._id),
                              setSelectedBooking(booking?.feedback);
                          }}
                        >
                          Leave Feedback
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "canceled" && (
              <div className="h-screen overflow-y-scroll">
                <div className="mb-6 ">
                  {canceledBookings.map((booking) => (
                    <Card
                      key={booking._id}
                      className=" shadow-md p-4 rounded-lg mb-4"
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
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <FeedbackModal
          close={handleModalClose}
          bookingId={selectedBookId}
          selectedBook={selelectedBooking}
        />
      )}
    </Layout>
  );
};

export default Bookings;
