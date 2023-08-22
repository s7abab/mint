import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "../services/axios";
import { getCurrentUser } from "../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  //get current user
  const getUser = async () => {
    try {
      const { data } = await Api.get("/auth/current-user");
      if (data?.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default protectedRoute;
