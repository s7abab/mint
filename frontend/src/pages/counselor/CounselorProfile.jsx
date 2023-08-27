import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCounselor } from "../../redux/features/profile/counselorProfileSlice";
import Layout from "../../components/Layout";
import Api from "../../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CounselorAdmin from "../../components/counselorProfile/counselorAdmin";
import CounselorUser from "../../components/counselorProfile/CounselorUser";

const CounselorProfile = () => {
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselorProfile);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  // Handle status
  const handleStatus = async (status) => {
    try {
      const res = await Api.post(`/admin/status/${counselorId}`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/applications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCounselor(counselorId));
  }, [dispatch]);
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
      </Layout>
    </>
  );
};

export default CounselorProfile;
