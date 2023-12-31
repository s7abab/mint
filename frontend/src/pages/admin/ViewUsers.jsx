import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import {
  blockUser,
  fetchAllUsers,
} from "../../redux/features/admin/adminActions";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.admin);

  const handleViewProfile = (userId) => {
    navigate(`/admin/users/${userId}`);
  };
  const handleBlock = (userId, value) => {
    dispatch(blockUser({ userId, value }));
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
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
                {users.map((data) => (
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
        )}
      </Layout>
    </>
  );
};

export default ViewUsers;
