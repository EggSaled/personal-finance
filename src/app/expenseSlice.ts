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
      // NOTE: using name as an id isn't ideal, since more than one expense can have
      // the same name (and as a result get filtered out)
      state.value = state.value.filter(e => e.name !== action.payload.name);
    },
    add: (state, action: PayloadAction<Expense>) => {
      state.value.push(action.payload);
    }
  }
});

export const { remove, add } = expenseSlice.actions;

export const expenseSelect = (state: RootState) => state.expense.value;

export default expenseSlice.reducer;
