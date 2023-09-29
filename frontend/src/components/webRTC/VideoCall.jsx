import React, {
  useContext,
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import socket from "../../services/socket";

let a = true;
let b = true;
function VideoCall({ data, close }) {
  const [myStream, setMyStream] = useState();
  const [remote, setRemote] = useState();
  const [camera, setCamera] = useState(true);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const ref = useRef();
  const remotRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: a, audio: b })
      .then((streams) => {
        ref.current.srcObject = streams;
        setMyStream(streams);
      });
  }, []);

  useEffect(() => {
    socket.emit("user:entered", { room: data?.room });
  }, []);

  // console.log(data)

  const sendOffer = useCallback(
    async (msg) => {
      try {
        console.log(msg);
        const offer = await peer.getOffer();
        socket.emit("user:sendoffer", { offer, room: data?.room });
      } catch (err) {
        console.log(err);
      }
    },
    [socket]
  );

  const recieveoffer = useCallback(
    async (offer) => {
      try {
        console.log(offer);
        const answer = await peer.getAnswer(offer);
        socket.emit("user:sendAns", { answer, room: data?.room });
      } catch (err) {
        console.log(err);
      }
    },
    [socket]
  );

  const acceptAns = useCallback(
    async (answer) => {
      try {
        console.log(myStream?.getTracks());
        await peer.acceptAnswer(answer);
        for (const track of myStream?.getTracks()) {
          peer.peer.addTrack(track, myStream);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [myStream]
  );

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", async () => {
      const offer = await peer.getOffer();
      socket.emit("user:sendoffer", { offer, room: data?.room });
    });
    return () => {
      peer.peer.removeEventListener("negotiationneeded", async () => {
        const offer = await peer.getOffer();
        socket.emit("user:sendoffer", { offer, room: data?.room });
      });
    };
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      let stream = ev.streams;
      setRemote(stream[0]);
      // remotRef.current.srcObject = stream[0];
      console.log(stream);
    });

    // peer.peer.addEventListener("")
  }, []);

  const handleToggleCamera = async () => {
    if (!a) {
      await ref.current.srcObject?.getVideoTracks()[0]?.stop();
    }
    if (!b) {
      await ref.current.srcObject?.getAudioTracks()[0]?.stop();
    }

    navigator.mediaDevices
      .getUserMedia({ video: a, audio: b })
      .then((streams) => {
        setMyStream(streams);
        ref.current.srcObject = streams;
      });
  };

  const handleToggleCameraWhileCalling = async () => {
    try {
      await ref.current.srcObject?.getVideoTracks()[0]?.stop();
      await ref.current.srcObject?.getAudioTracks()[0]?.stop();
    } catch (err) {
      console.log(err);
    } finally {
      await navigator.mediaDevices
        .getUserMedia({ video: a, audio: b })
        .then((streams) => {
          console.log("working");
          setMyStream(streams);
          ref.current.srcObject = streams;
        })
        .catch((err) => {
          console.log(err);
          setMyStream();
        });
    }
    // try {
    //  await peer.peer.getSenders().forEach(sender =>  peer.peer.removeTrack());

    //   for (const track of ref.current.srcObject?.getTracks()) {
    //     peer.peer.addTrack(track, ref.current.srcObject);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    socket.on("user:joined", sendOffer);
    socket.on("user:recieveoffer", recieveoffer);
    socket.on("user:acceptAns", acceptAns);

    return () => {
      socket.off("user:joined", sendOffer);
      socket.off("user:recieveoffer", recieveoffer);
      socket.off("user:acceptAns", acceptAns);
    };
  }, [socket, sendOffer, recieveoffer, acceptAns]);

  return (
    <div className="flex flex-col justify-center height-100vh">
      {video ? (
        <div className="flex justify-between flex-wrap self-center border-black border-solid border md:w-1/3 p-5">
          <div>
            <div className="myStream-div">
              <video ref={ref} className="myStream" autoPlay mute playsInline />
            </div>
            <div className="flex justify-between mt-4 ">
              {camera ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-camera"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    a = false;
                    handleToggleCamera();
                    setCamera(!camera);
                  }}
                >
                  {" "}
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />{" "}
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />{" "}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  onClick={() => {
                    a = true;
                    handleToggleCamera();
                    setCamera(!camera);
                  }}
                  stroke-linejoin="round"
                  class="feather feather-camera-off"
                >
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>
                </svg>
              )}

              {!audio ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-mic-mute"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    b = true;
                    handleToggleCamera();
                    setAudio(!audio);
                  }}
                >
                  {" "}
                  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3z" />{" "}
                  <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />{" "}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-mic"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    b = false;
                    handleToggleCamera();
                    setAudio(!audio);
                  }}
                >
                  {" "}
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />{" "}
                </svg>
              )}
            </div>
          </div>
          <div className="flex items-center ms-3">
            <button
              className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => {
                setVideo(false);
                try {
                  for (const track of ref.current.srcObject?.getTracks()) {
                    peer.peer.addTrack(track, myStream);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full">
            <div className="aspect-w-16 aspect-h-9">
              {/* Local video stream */}
              <video
                ref={ref}
                className="bg-black myVideo  rounded-lg"
                autoPlay
                muted
              ></video>
            </div>
            <div className="mt-4 w-full flex justify-center">
              {/* Remote video stream */}
              <ReactPlayer url={remote} height="70vh" width="80%" playing />
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={async () => {
                  if (ref.current.srcObject?.getVideoTracks()[0]) {
                    await ref.current.srcObject?.getVideoTracks()[0].stop();
                  }

                  if (ref.current.srcObject?.getAudioTracks()[0]) {
                    await ref.current.srcObject?.getAudioTracks()[0].stop();
                  }

                  peer.peer.close();
                  close();
                  window.location.reload();
                }}
              >
                End Call
              </button>
              <div className="flex justify-between mt-4 "></div>
            </div>
          </div>
        </div>
      )}
      {/* <ReactPlayer playing muted width="500px" height="500px" url={myStream} /><br />
      {remote ? <ReactPlayer playing muted width="500px" height="500px" url={remote} />:<h1>wait</h1>} */}
    </div>
  );
}

export default VideoCall;
