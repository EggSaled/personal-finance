/* indexSlice.ts - controls which component to display to the user. */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface IndexState {
  value: number
};

const initialState = {
  value: 0
} as IndexState;

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number>) => {
      if(state.value !== action.payload){
        state.value = action.payload;
      }
    }
  }
});

export const { change } = indexSlice.actions;

export const indexSelect = (state: RootState) => state.index.value;

export default indexSlice.reducer;
