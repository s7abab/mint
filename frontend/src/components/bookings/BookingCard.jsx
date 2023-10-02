import React from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import moment from "moment";

const BookingCard = ({ booking, handleCancelBooking, showSessionStartButton }) => {
  return (
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
        {showSessionStartButton(booking.time, booking.date) && (
          <Button
            size="sm"
            onClick={(e) => showSessionStartButton(e, booking._id)}
          >
            Join Session
          </Button>
        )}
        {handleCancelBooking(booking._id, booking.counselorId, booking.time, booking.date) && (
          <Button
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
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
