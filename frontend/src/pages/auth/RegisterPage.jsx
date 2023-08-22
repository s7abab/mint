import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/features/auth/authActions";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  //Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(userRegister({name,email,password,confirmPassword}))
  };
  return (
    <>
      <Layout>
        <div className="w-full mt-12 flex justify-center items-center">
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
                />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  label="Email"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  label="Password"
                />
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  size="lg"
                  label="Confirm Password"
                />
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Register
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already registered?{" "}
                <Link to={"/login"} className="font-medium text-gray-900">
                  Login
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
