import {  useSelector } from "react-redux";
import Layout from "../../components/Layout";
import CounselorAdmin from "../../components/counselorProfile/CounselorAdmin";
import CounselorUser from "../../components/counselorProfile/CounselorUser";
import CounselorCounselor from "../../components/counselorProfile/CounselorCounselor";

const CounselorProfile = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <Layout>
        {role === "user" && <CounselorUser />}
        {role === "admin" && <CounselorAdmin />}
        {role === "counselor" && <CounselorCounselor />}
      </Layout>
    </>
  );
};

export default CounselorProfile;
