import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/auth/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  // Redirect authenticated user to profile screen
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "user") {
      navigate("/counselors");
    } else if (role === "counselor") {
      navigate("/counselor/dashboard");
    }
  }, [navigate, role]);

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please provide all fields");
    }
    dispatch(userLogin({ email, password }));
  };
  return (
    <>
      <Layout sidebar={true}>
        <div className="w-full mt-32 flex justify-center items-center">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to Login
            </Typography>
            <form
              onSubmit={loginHandler}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-6">
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
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Login
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Not registered?{" "}
                <Link to={"/register"} className="font-medium text-gray-900">
                  Register Page
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
