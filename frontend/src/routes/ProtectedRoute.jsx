// ProtectedRoute.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../redux/features/auth/authActions";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get current user's data
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    } else {
      navigate("/");
    }
  }, [token, dispatch]);

  return <Outlet />;
};
export default ProtectedRoute;
