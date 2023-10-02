import { Button } from "@material-tailwind/react";

const WithdrawConfirm = ({ close, confirm }) => {
  return (
    <>
      <div className="absolute h-36 top-20 inset-0 flex  justify-center ">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <div className="flex">
            <p className="cursor-pointer" onClick={close}>
              X
            </p>
            <h2 className="mx-5 text-2xl font-semibold mb-4">Please Confirm</h2>
          </div>
          <div className="flex gap-5 justify-center">

          <Button onClick={confirm} color="green" className="mt-3">
            Confirm
          </Button>
          <Button onClick={close} color="red" className="mt-3">
            Cancel
          </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawConfirm;
