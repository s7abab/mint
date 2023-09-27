import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Message from "./Message";
import { useParams } from "react-router-dom";
import {
  fetchConversation,
  fetchMessages,
  postMessage,
} from "../../redux/features/message/messageActions";
import { setMessages } from "../../redux/features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading";
import socket from "../../services/socket";
import { Button } from "@material-tailwind/react";
import moment from "moment";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { _id } = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.message.conversation);
  const { messages, loading } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scroll = useRef();

  useEffect(() => {
    if (messages) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (id) {
      dispatch(fetchConversation({ receiver: id, sender: _id }));
    }
  }, [id, _id]);
  //fetch messages
  useEffect(() => {
    if (conversation && conversation[0] && conversation[0]._id) {
      dispatch(fetchMessages({ conversationId: conversation[0]._id }));
    }
  }, [dispatch, id, conversation]);

  useEffect(() => {
    socket.current = socket;
    socket.current.on("get:message", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        date: moment(),
      });
    });

    return () => {
      socket.current.off("get:message");
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      id === arrivalMessage.senderId &&
      dispatch(setMessages(arrivalMessage));
  }, [arrivalMessage, conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    e.target.querySelector("button").setAttribute("disabled", "true");

    try {
      await socket.current.emit("send:message", {
        senderId: _id,
        receiverId: id,
        text: message,
      });

      await dispatch(
        postMessage({
          message,
          conversationId: conversation[0]._id,
          receiverId: id,
        })
      );

      setMessage("");

      await dispatch(fetchMessages({ conversationId: conversation[0]._id }));
    } catch (error) {
      // Handle any errors here
      console.error("Error sending message:", error);
    } finally {
      e.target.querySelector("button").removeAttribute("disabled");
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 ">
            <div className="message-container space-y-2">
              {messages.map((data, index) => (
                <div ref={scroll} key={index}>
                  <Message
                    data={data}
                    isMe={data.senderId === _id} // Check if the message is from you
                  />
                </div>
              ))}
            </div>
          </div>
          {/* input message */}
          <div className="bg-white border-t p-4">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                value={message}
                className="flex-1 py-2 px-3 rounded-full border border-gray-300 focus:outline-none"
                placeholder="Type a message..."
              />
              <Button type="submit" className="rounded-full ml-2">
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
