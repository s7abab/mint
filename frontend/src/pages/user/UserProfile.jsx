import React, { useEffect } from 'react'
import UserUser from '../../components/userProfile/UserUser'
import { fetchSelectedUser } from '../../redux/features/users/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserAdmin from '../../components/userProfile/UserAdmin';

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    dispatch(fetchSelectedUser(userId));
  },[dispatch]);
  return (
    <>
    {/* User */}
    {role==="user" &&
          <UserUser />
        }

        {/* Admin */}
        {role === "admin" && (
          <UserAdmin />
        )}
    </>
  )
}

export default UserProfile