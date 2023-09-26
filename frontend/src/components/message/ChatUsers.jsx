import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCounselorConnections,
  fetchUserConnections,
} from "../../redux/features/message/messageActions";
import { useNavigate } from "react-router-dom";
import socket from "../../services/socket.js";

const ChatUsers = () => {
  const navigate = useNavigate();
  const { connections } = useSelector((state) => state.message);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleNavigate = (data) => {
    if (role === "counselor") {
      navigate("/counselor/messages/" + data.receiverId);
    } else if (role === "user") {
      navigate("/messages/" + data.receiverId);
    }
  };

  useEffect(() => {
    socket.current = socket;
    if (role === "counselor") {
      dispatch(fetchCounselorConnections());
    } else if (role === "user") {
      dispatch(fetchUserConnections());
    }
  }, [dispatch, role]);

  return (
    <div className="bg-white w-screen h-screen rounded-md shadow-lg">
      <div className="flex justify-between items-center"></div>
      <div className="bg-gray-100 text-xl rounded-r-md p-5 font-bold">
        Chat Users
      </div>
      <div className="p-4">
        <div className="overflow-y-auto max-h-60">
          {connections.map((data, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(data)}
              className="flex items-center space-x-3 p-4 rounded-md hover:bg-gray-100 cursor-pointer bg-gray-50 "
            >
              <div className="flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${data?.image}`}
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
