const conversationModel = require("../models/conversationModel.js");

const newConversation = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const newConversation = new conversationModel({
      members: [sender, receiver],
    });
    const savedConversation = await newConversation.save();
    res.status(200).send({
      success: true,
      message: "New message posted",
      savedConversation,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occured while posting message",
      error,
    });
  }
};

// get conversation
const getConversation = async (req, res) => {
  const { receiver, sender } = req.body;
  try {
    const conversation = await conversationModel.find({
      members: { $all: [receiver, sender] },
    });
    res.status(200).send({
      success: true,
      message: "Conversation fetched succussfully",
      conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occured during fetching conversation",
      error,
    });
  }
};

module.exports = { newConversation, getConversation };
