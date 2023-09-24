import React, { useEffect, useCallback, useState, useContext } from "react";
import ReactPlayer from "react-player";
import peer from "../services/peer";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { FcEndCall } from "react-icons/fc";
import { BsCameraVideo } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../services/socket"

const RoomPage = () => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [call, setCall] = useState(false);
  const [streamBtn, setStreamBtn] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(true);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      setStreamBtn(true);
      setCall(true);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
    setStreamBtn(true);
    setCall(true);
  }, []);

  const handleHangUp = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    setMyStream(null);
    setRemoteStream(null);
    setStreamBtn(false);
    setCall(false);
    socket.emit("hangup");
    if (role === "user") {
      navigate("/bookings");
    } else if (role === "counselor") {
      navigate("/counselor/bookings");
    }
  };
  // Function to toggle audio mute
  const toggleAudioMute = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioMuted;
        setIsAudioMuted(!isAudioMuted);
      }
    }
  };
  // Function to toggle camera off
  const toggleCamera = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOff;
        setIsCameraOff(!isCameraOff);
      }
    }
  };

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="h-screen bg-gray-800  w-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-5 left-5 z-50">
        <h4 className="bg-white p-2 rounded-lg">
          {remoteSocketId && "Connected"}
        </h4>
        {myStream && !streamBtn && (
          <button
            className="bg-blue-500 text-white p-2 rounded-lg mt-2"
            onClick={sendStreams}
          >
            Send Stream
          </button>
        )}
        {remoteSocketId && !myStream && !call && (
          <button
            className="bg-red-500 text-white p-2 rounded-lg mt-2"
            onClick={handleCallUser}
          >
            CALL
          </button>
        )}
      </div>
      <div className="rounded h-screen relative">
        {remoteStream && (
          <ReactPlayer
            playing
            muted
            height="100%"
            width="100%"
            url={remoteStream}
          />
        )}
      </div>
      <div className="absolute w-1/5 bottom-16 right-0 border-2 border-black">
        {myStream && (
          <ReactPlayer
            playing
            muted
            height="100%"
            width="100%"
            url={myStream}
          />
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-900 p-4 text-white flex justify-center">
        {isCameraOff ? (
          <BsCameraVideo
            className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleCamera}
          />
        ) : (
          <BsCameraVideo
            className="text-5xl mr-5 bg-red-500 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleCamera}
          />
        )}
        {isAudioMuted ? (
          <AiOutlineAudioMuted
            className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleAudioMute}
          />
        ) : (
          <AiOutlineAudioMuted
            className="text-5xl mr-5 bg-red-500 text-white rounded-full p-2  hover:text-white cursor-pointer"
            onClick={toggleAudioMute}
          />
        )}
        <FcEndCall
          className="text-5xl mr-5 bg-gray-700 text-white rounded-full p-2 hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={handleHangUp}
        />
      </div>
    </div>
  );
};

export default RoomPage;
