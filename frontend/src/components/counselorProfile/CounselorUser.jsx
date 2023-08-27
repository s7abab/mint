import { Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const CounselorUser = () => {
  const counselor = useSelector((state) => state.counselorProfile);
  return (
    <>
      <div className=" w-screen h-1/2 flex justify-center ">
        <div className="w-96 m-2 mt-8 py-10 b border-2 border-white object-cover object-center shadow-xl shadow-blue-gray-900/50 rounded-2xl">
          <div className="flex justify-center">
            <img
              className="rounded-full w-36 h-36 border-2 border-white object-cover object-center shadow-xl shadow-blue-gray-900/50"
              src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
              alt=""
            />
          </div>
          <div className="flex justify-center mt-4 text-lg font-bold">
            <h1>{counselor.name}</h1>
          </div>

          <div className="mt-2 mx-10 text-center">
            <p className="text-gray-700 mt-2">
              {counselor.category} Specialist
            </p>
            <p className="mt-4 text-gray-700 mt-2">Experience: {counselor.experience}</p>
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
