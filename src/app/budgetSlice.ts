import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface BudgetState {
  value: number
};

// casting initialState to type BudgetState, to remove the need for an extra
// import in store.ts
const initialState = {
  value: 0
} as BudgetState; 

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    }
  }
});

export const { deposit, withdraw } = budgetSlice.actions;

export const selectBudget = (state: RootState) => state.budget.value

export default budgetSlice.reducer;
