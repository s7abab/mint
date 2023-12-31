import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { fetchSelectedCounselorForAdmin } from "../../redux/features/admin/adminActions";
import { Loading } from "../Loading";

const CounselorProfileAdmin = () => {
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.admin.selectedCounselor);
  const { loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForAdmin(counselorId));
  }, [dispatch]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-bold text-center mb-2 text-gray-900">
                  {counselor?.name}'s Profile
                </h3>
              </div>
              <div className="mb-5 object-cover">
                {counselor?.image ? (
                  <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      counselor?.image
                    }`}
                    alt="John Doe"
                  />
                ) : (
                  <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src="https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
                    alt="John Doe"
                  />
                )}
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                      {counselor?.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Specialization
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {counselor?.category}
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
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {counselor?.address}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default CounselorProfileAdmin;
