import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedUser,
  uploadUserProfilePhoto,
} from "../../redux/features/users/userSlice";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import { updateUserProfile } from "../../redux/features/users/userSlice";

const UserUser = () => {
  const [file, setFile] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editingField, setEditingField] = useState(""); 
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth._id); 
  const user = useSelector((state) => state.user.selectedUser);

  // Handle image upload
  const handleImageUpload = async () => {
    try {
      dispatch(uploadUserProfilePhoto(file, userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSelectedUser(userId));
    if (file) {
      handleImageUpload();
    }
  }, [dispatch, userId, file]);

  const handleEditClick = (field) => {
    setEditingField(field);
    if (field === "name") {
      setEditedName(user && user[0]?.name);
    } else if (field === "email") {
      setEditedEmail(user && user[0]?.email);
    }
  };

  const handleSaveEdit = async () => {
    if (editingField === "name") {
      await dispatch(
        updateUserProfile({ field: "name", value: editedName, userId })
      );
      setEditingField("");
    } else if (editingField === "email") {
      await dispatch(
        updateUserProfile({ field: "email", value: editedEmail, userId })
      );
      dispatch(fetchSelectedUser(userId)); 
      setEditingField("");
    }
  };

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
                      handleImageUpload();
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
          <h1 className="text-2xl font-semibold mt-4 flex items-center">
            {editingField === "name" ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <AiFillCheckCircle
                  className="ml-2 cursor-pointer text-green-500"
                  onClick={handleSaveEdit}
                />
              </>
            ) : (
              <>
                {user && user[0]?.name}
                <AiFillEdit
                  className="ml-2 cursor-pointer"
                  onClick={() => handleEditClick("name")}
                />
              </>
            )}
          </h1>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center">
              {editingField === "email" ? (
                <>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <AiFillCheckCircle
                    className="ml-2 cursor-pointer text-green-500"
                    onClick={handleSaveEdit}
                  />
                </>
              ) : (
                <>
                  {user && user[0]?.email}
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("email")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserUser;
