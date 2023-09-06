import React from "react";
import Layout from "../../components/Layout"; 
import { useSelector } from "react-redux";

const CounselorDashboard = () => {
  const counselor = useSelector((state) => state.auth); 

  return (
    <Layout>
      <div className="min-h-screen p-4 w-screen">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Counselor Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Counselor Profile */}
            <div className="col-span-1 lg:col-span-2 mb-6">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Counselor Profile</h2>
                <p className="text-gray-600">
                  <strong>Name:</strong> {counselor.user}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {counselor.email}
                </p>
                {/* Add more counselor profile information here */}
              </div>
            </div>

            {/* Appointments */}
            <div className="col-span-1">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Appointments</h2>
                {/* List appointments or manage appointments here */}
                {/* You can map through the counselor's appointments and display them */}
              </div>
            </div>

            {/* Additional Widgets */}
            <div className="col-span-1">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Additional Widgets</h2>
                {/* Add widgets or information relevant to the counselor */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CounselorDashboard;
