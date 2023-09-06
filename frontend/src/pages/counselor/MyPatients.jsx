import React from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const MyPatients = () => {
  const counselor = useSelector((state) => state.auth); 
  const patients = counselor.patients; 

  return (
    <Layout>
      <div className="min-h-screen p-4 w-screen">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            My Patients
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Patient List */}
            <div className="col-span-3 mb-6">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Patients</h2>
                <ul>
                  {patients.map((patient) => (
                    <li key={patient.id} className="text-gray-600 mb-2">
                      <strong>Name:</strong> {patient.name}
                    </li>
                  ))}
                </ul>
                {/* Add more patient information as needed */}
              </div>
            </div>

            {/* Additional Widgets */}
            <div className="col-span-1">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  Additional Widgets
                </h2>
                {/* Add widgets or information relevant to the counselor */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPatients;
