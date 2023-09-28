import React from "react";
import { useNavigate } from "react-router-dom";

const CounselorCard = (data) => {
  const navigate = useNavigate();

  // Handle View Profile
  const handleViewProfile = (counselorId) => {
    navigate(`/counselors/${counselorId}`);
  };
  return (
    <>
      <div>
        <div className="w-52 bg-white hover:bg-gray-100 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              {data.data.image ? (
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src={`${import.meta.env.VITE_BACKEND_URL}${data.data.image}`}
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
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {data.data.name}
              </h3>
              <div className="text-center m-2 text-gray-400 text-xs font-semibold">
                <p>{data.data.category} Specialist</p>
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
              <div className="text-center my-3">
                <button
                  onClick={() => handleViewProfile(data.data._id)}
                  className="w-1/3 bg-black hover:bg-gray-600 text-white font-medium py-1 px-3 rounded-lg"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorCard;
