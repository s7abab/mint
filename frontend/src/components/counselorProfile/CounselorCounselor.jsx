import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import {
  fetchSelectedCounselor,
  updateCounselorProfile,
  uploadCounselorProfilePhoto,
} from "../../redux/features/counselor/counselorsSlice";

const UserUser = () => {
  const [file, setFile] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedSpecialization, setEditedSpecialization] = useState("");
  const [editedExperience, setEditedExperience] = useState("");
  const [editedFee, setEditedFee] = useState("");
  const [editingField, setEditingField] = useState("");
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.counselor.selectedCounselor);

  // Handle image upload
  const handleImageUpload = async () => {
    try {
      dispatch(uploadCounselorProfilePhoto(file, counselorId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (counselorId !== null) {
      dispatch(fetchSelectedCounselor(counselorId));
    }
    if (file) {
      handleImageUpload();
    }
  }, [dispatch, counselorId, file]);

  // To show value in input field when click edit
  const handleEditClick = (field) => {
    setEditingField(field);
    if (field === "name") {
      setEditedName(user?.name);
    } else if (field === "email") {
      setEditedEmail(user?.email);
    } else if (field === "specialization") {
      setEditedSpecialization(user?.category);
    } else if (field === "address") {
      setEditedAddress(user?.address);
    } else if (field === "experience") {
      setEditedExperience(user?.experience);
    } else if (field === "fee") {
      setEditedFee(user?.fee);
    }
  };
  // Handle profile edit
  const handleSaveEdit = async () => {
    if (editingField === "name") {
      await dispatch(
        updateCounselorProfile({
          field: "name",
          value: editedName,
          counselorId,
        })
      );
      setEditingField("");
    } else if (editingField === "email") {
      await dispatch(
        updateCounselorProfile({
          field: "email",
          value: editedEmail,
          counselorId,
        })
      );
      dispatch(fetchSelectedCounselor(counselorId));
      setEditingField("");
    } else if (editingField === "fee") {
      await dispatch(
        updateCounselorProfile({
          field: "fee",
          value: editedFee,
          counselorId,
        })
      );
      dispatch(fetchSelectedCounselor(counselorId));
      setEditingField("");
    } else if (editingField === "address") {
      await dispatch(
        updateCounselorProfile({
          field: "address",
          value: editedAddress,
          counselorId,
        })
      );
      dispatch(fetchSelectedCounselor(counselorId));
      setEditingField("");
    } else if (editingField === "specialization") {
      await dispatch(
        updateCounselorProfile({
          field: "specialization",
          value: editedSpecialization,
          counselorId,
        })
      );
      dispatch(fetchSelectedCounselor(counselorId));
      setEditingField("");
    }

    else if (editingField === "experience") {
        await dispatch(
          updateCounselorProfile({
            field: "experience",
            value: editedExperience,
            counselorId,
          })
        );
        dispatch(fetchSelectedCounselor(counselorId));
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
                src={`http://localhost:8080${user?.image}`}
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
                {user?.name}
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
                  {user?.email}
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("email")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center">
              {editingField === "address" ? (
                <>
                  <input
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                  <AiFillCheckCircle
                    className="ml-2 cursor-pointer text-green-500"
                    onClick={handleSaveEdit}
                  />
                </>
              ) : (
                <>
                  {user?.address}
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("address")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Specialization
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center">
              {editingField === "specialization" ? (
                <>
                  <input
                    type="text"
                    value={editedSpecialization}
                    onChange={(e) => setEditedSpecialization(e.target.value)}
                  />
                  <AiFillCheckCircle
                    className="ml-2 cursor-pointer text-green-500"
                    onClick={handleSaveEdit}
                  />
                </>
              ) : (
                <>
                  {user?.category}
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("specialization")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Experience
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center">
              {editingField === "experience" ? (
                <>
                  <input
                    type="text"
                    value={editedExperience}
                    onChange={(e) => setEditedExperience(e.target.value)}
                  />
                  <AiFillCheckCircle
                    className="ml-2 cursor-pointer text-green-500"
                    onClick={handleSaveEdit}
                  />
                </>
              ) : (
                <>
                  {user?.experience} Years
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("experience")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Fee
            </label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center">
              {editingField === "fee" ? (
                <>
                  <input
                    type="text"
                    value={editedFee}
                    onChange={(e) => setEditedFee(e.target.value)}
                  />
                  <AiFillCheckCircle
                    className="ml-2 cursor-pointer text-green-500"
                    onClick={handleSaveEdit}
                  />
                </>
              ) : (
                <>
                  {user?.fee}
                  <AiFillEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => handleEditClick("fee")}
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
