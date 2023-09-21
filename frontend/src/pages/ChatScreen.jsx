import React, { useEffect } from "react";
import Header from "../components/message/Header";
import Message from "../components/message/Message";
import InputMessage from "../components/message/InputMessage";
import { useParams } from "react-router-dom";
import {
  fetchConversation,
  fetchMessages,
} from "../redux/features/message/messageActions";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { _id } = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.message.conversation);
  const { messages, loading } = useSelector((state) => state.message);

  useEffect(() => {
    if (id) {
      dispatch(fetchConversation({ receiver: id, sender: _id }));
    }
  }, [id, _id]);

  useEffect(() => {
    if (conversation && conversation[0] && conversation[0]._id) {
      dispatch(fetchMessages({ conversationId: conversation[0]._id }));
    }
  }, [dispatch, id, conversation]);

  return (
    <div className="flex h-screen w-screen">
      {loading && <Loading />}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="message-container space-y-2">
            {messages.map((data, index) => (
              <Message
                key={index}
                data={data}
                isMe={data.senderId === _id} // Check if the message is from you
              />
            ))}
          </div>
        </div>

        <InputMessage />
      </div>
    </div>
  );
};

export default ChatScreen;
