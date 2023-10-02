import React from "react";
import moment from "moment";

const Message = ({ data, isMe }) => {
  const messageClass = isMe ? "ml-auto" : "";

  const getMessageTime = (timestamp) => {
    const messageTime = moment(timestamp);
    const now = moment();

    const diffInSeconds = now.diff(messageTime, "seconds");

    if (diffInSeconds < 60) {
      return "Just now";
    } else {
      return messageTime.format("hh:mm A");
    }
  };

  return (
    <div
      className={`w-28 overflow-hidden md:w-60 lg:w-80 p-3 rounded-lg shadow-md my-2 ${
        isMe ? "bg-gray-800 text-white" : "bg-gray-50"
      } ${messageClass}`}
    >
      <div className="text-sm">{data.message}</div>
      <div className="text-xs text-gray-500 mt-1 text-right">
        {getMessageTime(data.date)}
      </div>
    </div>
  );
};

export default Message;
