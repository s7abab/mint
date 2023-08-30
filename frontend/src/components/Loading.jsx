import { Spinner } from "@material-tailwind/react";

export const Loading = () => {
  return (
    <div className="">
      <Spinner className="h-12 w-12 absolute top-1/2 left-1/2" />
    </div>
  );
};
