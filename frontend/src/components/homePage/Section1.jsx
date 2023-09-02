import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Section1 = () => {
  const user = useSelector(state=>state.auth.user)
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gradient-to-r from-blue-gray-300 to-brown-400 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Refresh Your Mind With MINt</h1>
        <p className="text-lg mb-8">Your Online Mental Counseling Companion</p>
        {
          user ? (

        <Button color="white" size="lg" onClick={()=>navigate("/login")}>
          Dashboard
        </Button>
          ):(

        <Button color="white" size="lg" onClick={handleGetStarted}>
          Get Started
        </Button>
          )
        }
      </div>
    </div>
  );
};

export default Section1;
