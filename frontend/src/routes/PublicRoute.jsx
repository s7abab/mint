import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getCurrentUser } from "../redux/features/auth/authActions";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  // Get current user's data
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);
  return <Outlet />;
};

export default PublicRoute;
