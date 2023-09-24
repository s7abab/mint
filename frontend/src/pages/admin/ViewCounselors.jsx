import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Card, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  blockCounselor,
  fetchCounselorsForAdmin,
  fetchSelectedCounselorForAdmin,
} from "../../redux/features/admin/adminActions";

const ViewCounselors = () => {
  const dispatch = useDispatch();
  const counselors = useSelector((state) => state.admin.counselors);
  const navigate = useNavigate();

  const handleViewProfile = (counselorId) => {
    dispatch(fetchSelectedCounselorForAdmin(counselorId));
    navigate(`/admin/counselors/${counselorId}`);
  };

  const handleBlock = (counselorId, value) => {
    dispatch(blockCounselor({ counselorId, value }));
  };

  useEffect(() => {
    dispatch(fetchCounselorsForAdmin());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Card className="h-[87vh] w-full overflow-scroll mt-10 overflow-imp">
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
