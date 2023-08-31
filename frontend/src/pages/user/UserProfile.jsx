import React from "react";
import UserUser from "../../components/userProfile/UserUser";
import { useSelector } from "react-redux";
import UserAdmin from "../../components/userProfile/UserAdmin";

const UserProfile = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {/* User */}
      {role === "user" && <UserUser />}

      {/* Admin */}
      {role === "admin" && <UserAdmin />}
    </>
  );
};

export default UserProfile;
