import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import endpoints from "../../../services/endpoints";

// counselor connections
export const fetchCounselorConnections = createAsyncThunk(
  "/message/fetchCounselorConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.chat.counselor_connections);
      if (res.data.success) {
        return res.data.connections;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

// user connections
export const fetchUserConnections = createAsyncThunk(
  "/message/fetchUserConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.chat.user_connections);
      if (res.data.success) {
        return res.data.connections;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);
// user conversations
export const fetchConversation = createAsyncThunk(
  "/message/fetchConversation",
  async ({ receiver, sender }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.chat.get_conversation, {
        receiver,
        sender,
      });
      if (res.data.success) {
        return res.data.conversation;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

// fetch oppposite message
export const fetchOppositeMessages = createAsyncThunk(
  "/message/fetchOppositeMessages",
  async ({ senderId, conversationId }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.chat.get_opposite_messages, {
        senderId,
        conversationId,
      });
      if (res.data.success) {
        return res.data.oppositeMessages;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);
// fetch messages
export const fetchMessages = createAsyncThunk(
  "/message/fetchMessages",
  async ({ conversationId }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.chat.get_messages, {
        conversationId,
      });
      if (res.data.success) {
        return res.data.messages;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

//post new message
export const postMessage = createAsyncThunk(
  "/message/postMessage",
  async ({ message, conversationId }, { rejectWithValue }) => {
    console.log("Hello");
    try {
      const res = await Api.post(endpoints.chat.post_message, {
        message,
        conversationId,
      });
      if (res.data.success) {
        console.log("Message added");
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);
