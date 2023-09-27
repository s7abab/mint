import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Section1 = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className=" pt-20 bg-green-opacity">
      <div className="flex">
        <div className="container text-center w-screen flex flex-col justify-center">
          <h1 className=" font-bold sm:mb-6 mb-2  text-lg px-5 sm:text-4xl">
            Refresh Your Mind With <span className="text-green-500">MINt</span>{" "}
          </h1>
          <p className="sm:text-lg text-sm sm:mb-8 mb-3 px-2">
            Your Online Mental Counseling Companion
          </p>
        <div className="justify-center">
      {user ? (
          <Button
          className="sm:w-32 w-22 text-[10px] "
            onClick={() => navigate("/login")}
          >
            Dashboard
          </Button>
        ) : (
          <Button onClick={handleGetStarted}>
            Get Started
          </Button>
        )}
      </div>
        </div>
        <div>
          <img
            className="w-screen"
            src="../../../public/16692785_5767943.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
