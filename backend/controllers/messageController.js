const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");

const postMessage = async (req, res) => {
  const date = new Date();
  const { authId, conversationId, message, receiverId } = req.body;
  try {
    const newMessage = new messageModel({
      senderId: authId,
      conversationId,
      message,
      date,
    });
    await newMessage.save();

    res.status(200).send({
      success: true,
      message: "New message added",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const getOppositeMessage = async (req, res) => {
  try {
    const { senderId, conversationId } = req.body;
    const oppositeMessages = await messageModel.find(
      {
        senderId,
        conversationId,
      },
      { message: 1, date: 1 }
    );
    res.status(200).send({
      success: true,
      message: "Messages fetched successfully",
      oppositeMessages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while fetching messages",
      error,
    });
  }
};
const getMessage = async (req, res) => {
  try {
    const { authId, conversationId } = req.body;
    const messages = await messageModel.find(
      {
        conversationId,
      },
      { senderId: 1, message: 1, date: 1 }
    );
    res.status(200).send({
      success: true,
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while fetching messages",
      error,
    });
  }
};

module.exports = { postMessage, getOppositeMessage, getMessage };
