import { Button, Input, Card } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resendCounselorOtp,
  verifyCounselorOtp,
} from "../../redux/features/counselor/counselorActions";

const VerifyCounselorOTP = ({ closeModal, email }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);

  // Send OTP
  const otpHandler = (e, email, otp) => {
    e.preventDefault();
    dispatch(verifyCounselorOtp({ email, otp }));
  };

  // Resend OTP
  const resendOTPHandler = () => {
    dispatch(resendCounselorOtp({ email }));
    setTime(60);
  };

  // Handle OTP Change
  const handleOtpChange = (e) => {
    const newOtp = e.target.value;
    setOtp(newOtp);

    if (newOtp.length === 6) {
      otpHandler(e, email, newOtp);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (time > 0) {
      const timerInterval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [time]);

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0">
        <Card className="bg-gray-200 p-5" color="transparent" shadow={false}>
          <p className="cursor-pointer w-2" onClick={closeModal}>
            X
          </p>
          <form
            onSubmit={(e) => otpHandler(e, email, otp)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                onChange={handleOtpChange}
                placeholder="Enter 6 digits"
                size="lg"
              />
              <p>
                {time > 0
                  ? `OTP expires in ${time} seconds`
                  : "OTP has expired"}
              </p>
              {time <= 0 && (
                <Button onClick={() => resendOTPHandler(email)}>
                  Resend OTP
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default VerifyCounselorOTP;