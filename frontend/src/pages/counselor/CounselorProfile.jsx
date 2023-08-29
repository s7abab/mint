import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import CounselorAdmin from "../../components/counselorProfile/counselorAdmin";
import CounselorUser from "../../components/counselorProfile/CounselorUser";
import { fetchSelectedCounselor } from "../../redux/features/counselor/counselorsSlice";
// import { fetchCounselor } from "../../redux/features/counselor/counselorProfileSlice";

const CounselorProfile = () => {
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    dispatch(fetchSelectedCounselor(counselorId));
  },[dispatch]);
  return (
    <>
      <Layout>
        {/* User */}
        {role==="user" &&
          <CounselorUser counselorId={counselorId} />
        }

        {/* Admin */}
        {role === "admin" && (
          <CounselorAdmin />
        )}
      </Layout>
    </>
  );
};

export default CounselorProfile;
