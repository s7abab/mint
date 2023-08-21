import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../services/axios";
import {toast} from 'react-hot-toast'
import {useDispatch, useSelector} from "react-redux"
import {login, logout} from "../../redux/features/authSlice"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=> state.auth.user);

  const loginHandler = async (e)=>{
    e.preventDefault();
    try {
      const res = await Api.post("/auth/login",{
        email,
        password
      })
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data))
        dispatch(login(res.data.user)); 
        if(res.data.user.role === "admin"){
          navigate("/admin-applications");
        }else{
          navigate("/");
        }
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <Layout>
    <div className="w-full mt-24 flex justify-center items-center">
     <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Login
        </Typography>
        <form onSubmit={loginHandler} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input onChange={(e)=> setEmail(e.target.value)} size="lg" label="Email" />
            <Input onChange={(e)=> setPassword(e.target.value)} type="password" size="lg" label="Password" />
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
