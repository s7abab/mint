import React, { useEffect, useRef, useState } from "react";
import Header from "../components/message/Header";
import Message from "../components/message/Message";
import { useParams } from "react-router-dom";
import {
  fetchConversation,
  fetchMessages,
  postMessage,
} from "../redux/features/message/messageActions";
import { setMessages } from "../redux/features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import socket from "../services/socket";
import { Button } from "@material-tailwind/react";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { _id, user } = useSelector((state) => state.auth);
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

  // fetch conversations
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

  //socket
  useEffect(() => {
    socket.current = socket;
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        date: Date.now(),
      });
    });

    return () => {
      socket.current.off("getMessage");
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      id === arrivalMessage.senderId &&
      dispatch(setMessages(arrivalMessage));
  }, [arrivalMessage, conversation]);

  // send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    socket.current.emit("sendMessage", {
      senderId: _id,
      receiverId: id,
      text: message,
    });
    dispatch(
      postMessage({
        message,
        conversationId: conversation[0]._id,
        receiverId: id,
      })
    )
      .then(() => setMessage(""))
      .then(() => {
        dispatch(fetchMessages({ conversationId: conversation[0]._id }));
      });
  };

  return (
    <div className="flex h-screen w-screen">
      {loading && <Loading />}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 ">
          <div className="message-container space-y-2">
            {messages.map((data, index) => (
              <div ref={scroll}>
                <Message
                  key={index}
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
  );
};

export default ChatScreen;
