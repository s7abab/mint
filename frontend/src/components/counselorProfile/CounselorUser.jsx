import { Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const CounselorUser = ({counselorId}) => {
  const counselor = useSelector((state) => state.counselor.selectedCounselor);

  if (!counselor) {
    return <p>Loading...</p>; // Add a loading state or message
  }
  return (
    <>
      <div className=" w-screen h-1/2 flex justify-center ">
        <div className="w-96 m-2 mt-8 py-10 b border-2 border-white object-cover object-center shadow-xl shadow-blue-gray-900/50 rounded-2xl">
          <div className="flex justify-center">
          {counselor.image ? (<img
                className="w-32 h-32 rounded-full mx-auto"
                src= {`http://localhost:8080${counselor.image}`}
                alt="John Doe"
              />) :(
                <img
                className="w-32 h-32 rounded-full mx-auto"
                src= "https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
                alt="John Doe"
              />
              )}
          </div>
          <div className="flex justify-center mt-4 text-lg font-bold">
            <h1>{counselor.name}</h1>
          </div>

          <div className="mt-2 mx-10 text-center">
            <p className="text-gray-700 mt-2">
              {counselor.category} Specialist
            </p>
            <p className="mt-4 text-gray-700 ">Experience: {counselor.experience}</p>
            <p className="text-gray-700 mt-2">Fee: {counselor.fee}</p>
          </div>
          <div className="flex justify-center mt-10 gap-8">
            <Button className="w-28">Message</Button>
            <Button className="w-28">Book</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorUser;
