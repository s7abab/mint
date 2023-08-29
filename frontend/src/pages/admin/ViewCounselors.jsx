import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Card, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "../../services/axios";
import toast from "react-hot-toast";
import {
  fetchAllCounselors,
  fetchSelectedCounselor,
} from "../../redux/features/counselor/counselorsSlice";

const ViewCounselors = () => {
  const dispatch = useDispatch();
  const counselors = useSelector((state) => state.counselor.counselors);
  const navigate = useNavigate();

  // Handle View Profile
  const handleViewProfile = (counselorId) => {
    dispatch(fetchSelectedCounselor(counselorId));
    navigate(`/admin/counselors/${counselorId}`);
  };

  // Handle block counselor
  const handleBlock = async (counselorId, value) => {
    try {
      const res = await Api.post("/admin/counselors", {
        counselorId,
        value: !value,
      });
      dispatch(fetchAllCounselors());
      if (res.data.success) {
        if (res.data.message) {
          toast.success("Blocked");
        } else {
          toast.success("Unblocked");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllCounselors());
  }, [dispatch]);
  return (
    <>
      <Layout>
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
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Block
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    View
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {counselors.map((data) => (
                <tr key={data._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      onClick={() => handleBlock(data._id, data.isBlocked)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal cursor-pointer"
                    >
                      {data.isBlocked ? "Unblock" : "Block"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      onClick={() => handleViewProfile(data._id)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal cursor-pointer"
                    >
                      View
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Layout>
    </>
  );
};

export default ViewCounselors;
