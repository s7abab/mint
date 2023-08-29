import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { fetchAllUsers } from "../../redux/features/users/userSlice";
import { useDispatch } from "react-redux";

const ViewUsers = () => {
//     const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default ViewUsers;
