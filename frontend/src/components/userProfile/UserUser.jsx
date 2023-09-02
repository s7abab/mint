import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import {
  fetchSelectedUser,
  updateUserProfile,
  uploadUserProfilePhoto,
} from "../../redux/features/users/userActions";
import { useParams } from "react-router-dom";

const UserUser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.user.selectedUser);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [file, setFile] = useState(null);

  // Editing field state
  const [editingField, setEditingField] = useState("");

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
  }, [dispatch, userId]);

  // Update the form data when user data changes
  useEffect(() => {
    if (user && user[0]) {
      setFormData({
        name: user[0].name || "",
        email: user[0].email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      handleImageUpload();
    }
  }, [dispatch, userId, file]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingField === "name" || editingField === "email") {
      await dispatch(
        updateUserProfile({
          field: editingField,
          value: formData[editingField],
          userId,
        })
      );
      setEditingField("");
    }
  };

  // Render input fields for editing
  const renderField = (fieldName, label) => (
    <div key={fieldName} className="mt-4">
      <label
        htmlFor={fieldName}
        className="block text-gray-700 font-medium mb-2"
      >
        {label}
      </label>
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center">
          <div className="flex-grow">
            {editingField === fieldName ? (
              <input
                type="text"
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
                className="w-full border rounded-md py-1 px-2 focus:outline-none focus:border-blue-400"
              />
            ) : (
              <div className="font-medium">{formData[fieldName]}</div>
            )}
          </div>
          <div>
            {editingField === fieldName ? (
              <AiFillCheckCircle
                className="cursor-pointer text-green-500"
                onClick={handleFormSubmit}
              />
            ) : (
              <AiFillEdit
                className="cursor-pointer text-black"
                onClick={() => setEditingField(fieldName)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="w-full mx-auto mt-5 p-6 rounded-lg">
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
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {renderField("name", "Name")}
            {renderField("email", "Email")}
          </div>
          <div className="mt-4"></div>
        </form>
      </div>
    </Layout>
  );
};

export default UserUser;
