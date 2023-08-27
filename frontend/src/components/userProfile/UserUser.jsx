import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedUser,
  uploadUserProfilePhoto,
} from "../../redux/features/users/userSlice";
import { Button } from "@material-tailwind/react";

const UserUser = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.user.selectedUser);
  // Handle image upalod
  const handleImageUpload = async (e) => {
    try {
      dispatch(uploadUserProfilePhoto(file, userName));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSelectedUser(userName));
    if (file) {
      handleImageUpload();
    }
  }, [dispatch, userName, file]);

  return (
    <>
      <Layout>
        <div className="w-screen mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src={`http://localhost:8080${user && user[0]?.image}`}
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-70 transition duration-300 opacity-0 hover:opacity-100">
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-white"
                >
                  Change Photo
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      handleImageUpload(e);
                    }}
                    type="file"
                    name="image"
                    accept="image/*"
                    id="photo-upload"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mt-4">
            {user && user[0]?.name}
          </h1>

          <div className="mt-2">
            <label
              htmlFor="specialization"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100">
              {user && user[0]?.email}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserUser;
