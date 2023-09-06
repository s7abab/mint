import React from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <Layout>
        <div className="min-h-screen p-4 w-screen">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              User Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* User Profile */}
              <div className="col-span-1 lg:col-span-2 mb-6">
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">User Profile</h2>
                  <p className="text-gray-600">
                    <strong>Name:</strong> {user.user}
                  </p>
                  {/* Add more user profile information here */}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="col-span-1">
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Upcoming Sessions
                  </h2>
                  {/* List upcoming appointments here */}
                  {/* You can map through the user's appointments and display them */}
                </div>
              </div>

              {/* Additional Widgets */}
              <div className="col-span-1">
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Additional Widgets
                  </h2>
                  {/* Add widgets or information relevant to the user */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserDashboard;
