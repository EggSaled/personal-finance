/* messageSlice.ts - Handles event messages that 
 * will be displayed with the tooltip component. */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface MessageState {
  isSuccessful: boolean,
  message: string
};

const initialState = {
  isSuccessful: false,
  message: ""
} as MessageState;

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clear: (state) => {
      // Simply reset the state to initialState
      state.isSuccessful = initialState.isSuccessful;
      state.message = initialState.message;
    },
    notify: (state, action: PayloadAction<MessageState>) => {
      // New message dispatched
      state.isSuccessful = action.payload.isSuccessful;
      state.message = action.payload.message;
    } 
  }
});

export const { clear, notify } = messageSlice.actions;

export const messageSelect = ((state: RootState) => state.message);

export default messageSlice.reducer;
