import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/features/auth/authActions";
import VerifyOTP from "../../components/otp/VerifyOTP";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      userRegister({ name, email, password, confirmPassword })
    );
    if (res.payload.success) {
      toast.success(res.payload.message);
      setModal(!modal);
    }
  };

  // Close Modal
  const closeModal = () => {
    setModal(false);
  };

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user,navigate]);
  return (
    <>
      <Layout sidebar={true}>
        <div className="w-full mt-14 flex justify-center items-center">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Register
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to Register
            </Typography>
            <form
              onSubmit={handleRegister}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  label="Name"
                  required
                />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  label="Email"
                  required
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  label="Password"
                  required
                />
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  size="lg"
                  label="Confirm Password"
                  required
                />
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                {email ? "Send OTP" : "Register"}
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already registered?{" "}
                <Link to={"/login"} className="font-medium text-gray-900">
                  Login
                </Link>
              </Typography>
            </form>

            <Button onClick={() => navigate("/apply")} className="mt-3">
              Apply as counselor
            </Button>
          </Card>
        </div>
        {modal && <VerifyOTP closeModal={closeModal} email={email} />}
      </Layout>
    </>
  );
};

export default RegisterPage;
