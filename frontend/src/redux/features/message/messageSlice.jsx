import { createSlice } from "@reduxjs/toolkit";
import {
  fetchConversation,
  fetchCounselorConnections,
  fetchMessages,
  fetchOppositeMessages,
  fetchUserConnections,
} from "./messageActions";

const initialState = {
  connections: [],
  conversation: null,
  messages: [],
  oppositeMessages: [],
  loading: false,
  error: false,
};
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = [...state.messages,payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // cousnelor connections
      .addCase(fetchCounselorConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounselorConnections.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.connections = payload;
        state.error = null;
      })
      .addCase(fetchCounselorConnections.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // user connections
      .addCase(fetchUserConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserConnections.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.connections = payload;
        state.error = null;
      })
      .addCase(fetchUserConnections.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // fetch opposite messages
      .addCase(fetchOppositeMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOppositeMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.oppositeMessages = payload;
        state.error = null;
      })
      .addCase(fetchOppositeMessages.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // get conversation
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.conversation = payload;
        state.error = null;
      })
      .addCase(fetchConversation.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { setMessages } = messageSlice.actions;
export default messageSlice;
