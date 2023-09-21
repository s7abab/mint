import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCounselorConnections,
  fetchUserConnections,
} from "../../redux/features/message/messageActions";
import { useNavigate } from "react-router-dom";

const ChatUsers = () => {
  const navigate = useNavigate();
  const { connections } = useSelector((state) => state.message);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleNavigate = (data)=>{
    if(role==="counselor"){
      navigate("/counselor/messages/" + data.receiverId)
    }else if(role==="user"){
      navigate("/messages/" + data.receiverId)
    }
  }

  useEffect(() => {
    if (role === "counselor") {
      dispatch(fetchCounselorConnections());
    } else if (role === "user") {
      dispatch(fetchUserConnections());
    }
  }, [dispatch]);

  return (
    <div className="bg-white w-screen h-screen rounded-md shadow-lg">
      <div className="flex justify-between items-center p-4"></div>
      <div className="p-4">
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-gray-400 mb-4"
          type="text"
          placeholder="Search users"
        />
        <div className="overflow-y-auto max-h-60">
          {connections.map((data, index) => (
            <div
              key={index}
              onClick={()=>handleNavigate(data)}
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex-shrink-0">
                <img
                  src={`http://localhost:8080${data?.image}`}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">{data.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatUsers;
