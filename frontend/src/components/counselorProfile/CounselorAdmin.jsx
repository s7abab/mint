import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeStatus } from "../../redux/features/admin/adminSlice";

const CounselorAdmin = () => {
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const userId = useSelector((state) =>
    state.counselor.selectedCounselor
      ? state.counselor.selectedCounselor._id
      : null
  );

  const statusHandler = (userId, status) => {
    dispatch(changeStatus({ userId, status }));
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Counselor Application
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about Counselor.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
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
            <button
              className="bg-green-600 w-24 rounded-md"
              onClick={() => statusHandler(userId, "active")}
            >
              Approve
            </button>
            <button
              className="bg-red-600 w-24 rounded-md"
              onClick={() => statusHandler(userId, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorAdmin;
