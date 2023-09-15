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
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Refresh Your Mind With <span className="text-green-500">MINt</span>{" "}
        </h1>
        <p className="text-lg mb-8">Your Online Mental Counseling Companion</p>
        {user ? (
          <Button
            className="bg-green-500"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Dashboard
          </Button>
        ) : (
          <Button className="bg-green-500" size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};

export default Section1;
