import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../types/Expense";
import type { RootState } from "./store";

export interface ExpenseState {
  value: Array<Expense>
};

const initialState = {
  value: []
} as ExpenseState;

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<Expense>) => {
      state.value = state.value.filter(e => e != action.payload);
    },
    add: (state, action: PayloadAction<Expense>) => {
      state.value.push(action.payload);
    }
  }
});

export const { remove, add } = expenseSlice.actions;

export const expenseSelect = (state: RootState) => state.expense.value;

export default expenseSlice.reducer;
