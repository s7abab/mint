import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { fetchAllBookings } from "../../redux/features/counselor/counselorActions";

const CounselorDashboard = () => {
  const counselor = useSelector((state) => state.auth);

  useEffect(()=>{
    fetchAllBookings()
  },[])
  return (
    <Layout>
      <div className="w-full p-2">
        <h4 className="mx-4 text-3xl font-semibold my-8">Hey {counselor.user}!</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold">
              Total <br /> Bookings
            </p>
            <p className="text-4xl text-blue-600"></p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold">
              Total <br /> Users
            </p>
            <p className="text-4xl text-green-600"></p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold">
              Total <br /> Applications
            </p>
            <p className="text-4xl text-red-600"></p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold">
              Total <br /> Revenue
            </p>
            <p className="text-4xl text-green-600">25698</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md"></div>
          <div className="bg-white p-4 rounded-lg shadow-md"></div>
        </div>
      </div>
    </Layout>
  );
};

export default CounselorDashboard;
