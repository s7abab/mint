import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, postMessage } from "../../redux/features/message/messageActions";

const InputMessage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const conversation = useSelector((state) => state.message.conversation);
  const handleSendMessage = () => {
    dispatch(postMessage({ message, conversationId: conversation[0]._id })).then(()=>{
      dispatch(fetchMessages({conversationId: conversation[0]._id}))
    })
  };
  return (
    <div className="bg-white border-t p-4">
      <div className="flex items-center">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 py-2 px-3 rounded-full border border-gray-300 focus:outline-none"
          placeholder="Type a message..."
        />
        <Button className="rounded-full ml-2" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputMessage;
