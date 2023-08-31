import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import CounselorAdmin from "../../components/counselorProfile/counselorAdmin";
import CounselorUser from "../../components/counselorProfile/CounselorUser";
import CounselorCounselor from "../../components/counselorProfile/CounselorCounselor";

const CounselorProfile = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <Layout>
        {/* User */}
        {role === "user" && <CounselorUser />}

        {/* Admin */}
        {role === "admin" && <CounselorAdmin />}
        {/* Counselor */}
        {role === "counselor" && <CounselorCounselor />}
      </Layout>
    </>
  );
};

export default CounselorProfile;
