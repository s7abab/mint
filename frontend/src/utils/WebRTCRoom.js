import { useState, useEffect, useCallback } from "react";
import socket from "../services/socket";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useWebRTC = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("123");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e, roomId) => {
      e.preventDefault();
      socket.emit("room:join", { email: user, room: roomId });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return {
    handleSubmit
  };
};
