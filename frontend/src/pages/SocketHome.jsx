import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Global } from "../socket/Socket"

const SocketHome = () => {
  const navigate = useNavigate();
  const {socket} = useContext(Global)
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("123");

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data)=>{
    const {email, room} = data
    navigate(`/room/${room}`)
  },[])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return ()=>{
        socket.off("room:join", handleJoinRoom)
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room id"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit"> Join Room </button>
        </form>
      </div>
    </div>
  );
};

export default SocketHome;
