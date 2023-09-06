import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  deleteSlot,
  fetchScheduledSlots,
} from "../../redux/features/counselor/counselorActions";
import moment from "moment";
import toast from "react-hot-toast";

const ScheduledSlots = () => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const slots = useSelector((state) => state.counselor.slots);

  useEffect(() => {
    dispatch(fetchScheduledSlots(counselorId));
  }, [counselorId, dispatch, slots.length]);

  // ================== Handle Delete ====================
  const handleDelete = (_id, counselorId) => {
    dispatch(deleteSlot({ _id, counselorId })).then(() => {
      dispatch(fetchScheduledSlots(counselorId));
    });
  };

  // ==================== Handle Cancel =====================
  const handleCancel = async (_id, counselorId) => {
    try {
      await dispatch(cancelBooking({ _id, counselorId }));
      toast.success("Booking cancelled successfully");
      await dispatch(fetchScheduledSlots(counselorId));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Filter slots into different sections
  const pendingBookings = slots.filter((data) => data.status === "pending");
  const bookedSlots = slots.filter((data) => data.status === "booked");
  const userCancelledSlots = slots.filter(
    (data) => data.status === "userCancelled"
  );
  const cancelledSlots = slots.filter((data) => data.status === "cancelled" || data.status === "userCancelled");

  return (
    <Card className="h-full w-full overflow-scroll mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Section
          title="Pending Bookings"
          slots={pendingBookings}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
        <Section
          title="Booked Slots"
          slots={bookedSlots}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
        <Section
          title="User Cancelled Slots"
          slots={userCancelledSlots}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
        <Section
          title="Cancelled Slots"
          slots={cancelledSlots}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
};

const Section = ({ title, slots, onCancel, onDelete }) => {
  return (
    <div className="p-4 bg-gray-50 h-80 overflow-y-scroll">
      <Typography variant="h6" color="blue-gray" className="font-semibold mb-2">
        {title}
      </Typography>
      <div className="grid gap-2">
        {slots.map((data) => (
          <div
            key={data._id}
            className={`border p-4 rounded-lg shadow-md ${
              data.status === "cancelled"
                ? "text-red-600"
                : data.status === "booked"
                ? "text-green-600"
                : ""
            }`}
          >
            <Typography variant="small" className="font-normal">
              Date: {moment(data.date).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="small" className="font-normal">
              Time: {moment(data.time).format("h:mm a")} -{" "}
              {moment(data.time).add(1, "hours").format("h:mm a")}
            </Typography>
            <Typography
              variant="small"
              className={`font-normal cursor-pointer ${
                data.status === "booked"
                  ? "text-green-600"
                  : data.status === "cancelled"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {data.status}
              {data.status === "pending" && (
                <button
                  className="ml-2 text-red-600"
                  onClick={() => onDelete(data._id, data.counselorId)}
                >
                  Delete
                </button>
              )}
              {data.status === "booked" && (
                <button
                  className="ml-2 text-red-600"
                  onClick={() => onCancel(data._id, data.counselorId)}
                >
                  Cancel
                </button>
              )}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledSlots;
