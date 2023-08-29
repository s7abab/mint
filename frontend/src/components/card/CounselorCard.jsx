import React from "react";
import { useNavigate } from "react-router-dom";

const CounselorCard = (data) => {
  const navigate = useNavigate()

    // Handle View Profile
    const handleViewProfile = (counselorId) => {navigate(`/user/counselors/${counselorId}`);
    };
  return (
    <>
      <div className="">
        <div className="w-52">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              {data.data.image ? (<img
                className="w-32 h-32 rounded-full mx-auto"
                src= {`http://localhost:8080${data.data.image}`}
                alt="John Doe"
              />) :(
                <img
                className="w-32 h-32 rounded-full mx-auto"
                src= "https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
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
                  <tr>
                  </tr>
                </tbody>
              </table>
              <div className="text-center my-3">
                <a
                  className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                  href="#"
                >
                  <button onClick={()=>handleViewProfile(data.data._id)} className="w-1/2 bg-black hover:bg-indigo-600 text-white font-medium py-1 px-3 rounded-lg">
                    View
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorCard;
