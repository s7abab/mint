import React from "react";
import { Spinner } from "@material-tailwind/react";

const SpinnerLoading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinner className="h-16 w-16 text-gray-900/50 " />
      </div>
    </>
  );
};

export default SpinnerLoading;
