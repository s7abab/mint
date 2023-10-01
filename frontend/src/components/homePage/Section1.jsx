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
    <div className=" pt-20 bg-green-opacity mb-10">
      <div className="container mx-auto text-center p-5 sm:p-0">
        <h1 className="sm:text-4xl text-2xl font-bold mb-6">
          Refresh Your Mind With <span className="text-green-500 moving-text">MINt</span>{" "}
        </h1>
        <p className="sm:text-lg text-xs mb-8">Your Online Mental Counseling Companion</p>
        {user ? (
          <Button
          className="sm:w-32 w-24 sm:text-[10px] text-[8px]"
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
  );
};

export default Section1;
