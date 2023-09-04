import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduledSlots } from "../../redux/features/counselor/counselorActions";
import moment from "moment";

const ScheduledSlots = () => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const slots = useSelector((state) => state.counselor.slots);

  useEffect(() => {
    dispatch(fetchScheduledSlots(counselorId));
  }, [dispatch, counselorId]);

  return (
    <Card className="h-full w-full overflow-scroll mt-10">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Date
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Time
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Status
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {slots.map((data) => (
            <tr key={data._id}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {moment(data.date).format("DD-MM-YYYY")}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {moment(data.time).format("h:mm a")}
                </Typography>
              </td>

              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  className="font-normal cursor-pointer"
                  color={data.status==="booked"? "green" : "grey"}
                >
                  {data.status}
                </Typography>
              </td>
              {data.status==="booked" ? (
                <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="red"
                  className="font-normal cursor-pointer"
                >
                  Cancel
                </Typography>
              </td>
              ) : (
                <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="red"
                  className="font-normal cursor-pointer"
                >
                  Delete
                </Typography>
              </td>
              )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ScheduledSlots;
