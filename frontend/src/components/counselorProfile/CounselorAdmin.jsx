import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSelectedCounselorForAdmin,
} from "../../redux/features/admin/adminActions";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import Api from "../../services/axios";
import { Button, Typography } from "@material-tailwind/react";

const CounselorAdmin = () => {
  const dispatch = useDispatch();
  const { counselorId } = useParams();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForAdmin(counselorId));
  }, [dispatch]);

  const counselor = useSelector((state) => state?.admin?.selectedCounselor);

  if (!counselor) {
    return <Loading />;
  }

  const statusHandler = async (userId, status) => {
    try {
      const res = await Api.post(`admin/status/${userId}`, { status });
      if (res.data.success) {
        navigate("/admin/applications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <Typography className="text-lg leading-6 font-medium text-gray-900">
                Counselor Application
              </Typography>
              <Typography className="mt-1 max-w-2xl text-sm text-gray-500">
                Details and informations about Counselor.
              </Typography>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Specialization
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.specialization} Specialist
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Experience
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.experience} Years
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Appoinment Fee
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.fee}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {counselor?.address}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-center gap-8 mt-5 mb-5">
              <Button
                className="bg-green-900 w-25 rounded-md"
                onClick={() => statusHandler(counselorId, "active")}
              >
                Approve
              </Button>
              <Button
                className="bg-red-900 w-25 rounded-md"
                onClick={() => statusHandler(counselorId, "rejected")}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CounselorAdmin;
