import React, { useState } from "react";
import {
  AiFillCamera,
  AiOutlineAudioMuted,
  AiOutlinePhone,
} from "react-icons/ai";

import { BsCameraVideo } from "react-icons/bs";

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);

  return (
    <div className="h-screen bg-gray-900 w-screen flex justify-center items-center">
      <video src="" className=" bg-black w-4/5 rounded"></video>
      <video src="" className=" bg-black w-1/6 rounded-md border border-white absolute z-10 top-[71vh] right-36"></video>
      <div className="flex z-10 gap-5 absolute top-[86vh] bg-gray-800 rounded-3xl px-5 py-1 items-center">
        <BsCameraVideo color="white" size={32}  />
        <AiOutlineAudioMuted color="white" size={32} />
        <AiOutlinePhone color="red" size={34} />
      </div>
    </div>
  );
};

export default VideoCall;
