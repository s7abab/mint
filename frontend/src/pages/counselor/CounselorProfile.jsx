import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import CounselorAdmin from "../../components/counselorProfile/counselorAdmin";
import CounselorUser from "../../components/counselorProfile/CounselorUser";
import { fetchSelectedCounselor } from "../../redux/features/counselor/counselorsSlice";
import CounselorCounselor from "../../components/counselorProfile/CounselorCounselor";
// import { fetchCounselor } from "../../redux/features/counselor/counselorProfileSlice";

const CounselorProfile = () => {
  const { counselorId } = useParams();
 const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role); 

  useEffect(() => {
    dispatch(fetchSelectedCounselor(counselorId));
  },[dispatch]);
  return (
    <>
      <Layout>
        {/* User */}
        {role==="user" &&
          <CounselorUser />
        }

        {/* Admin */}
        {role === "admin" && (
          <CounselorAdmin />
        )}
        {/* Counselor */}
        {role === "counselor" && (
          <CounselorCounselor />
        )}
      </Layout>
    </>
  );
};

export default CounselorProfile;
