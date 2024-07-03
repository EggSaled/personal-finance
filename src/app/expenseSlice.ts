import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../types/Expense";
import type { RootState } from "./store";

/* Using capacity as an id, since we aren't relying on a database
 * for this application. */
export interface ExpenseState {
  expenses: Array<Expense>,
  capacity: number
};

const initialState = {
  expenses: [],
  capacity: 0
} as ExpenseState;

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<Expense>) => {
      if(state.capacity == 0 || state.expenses.length === 0) return;

      state.expenses = state.expenses.filter(e => e.id !== action.payload.id);
    },
    addOne: (state, action: PayloadAction<Expense>) => {
      // Assign an id to the payload, then push onto the state.
      let newExpense = action.payload;
      newExpense.id = state.capacity;
      state.expenses.push(newExpense);
      state.capacity += 1;
    },
    addMany: (state, action: PayloadAction<Array<Expense>>) => {
      action.payload.forEach((element: Expense) => {
        element.id = state.capacity;
        console.log(element);
        state.expenses.push(element);
        state.capacity += 1;
      });
    }
  }
});

export const { remove, addOne, addMany } = expenseSlice.actions;

export const expenseSelect = (state: RootState) => state.expense.expenses;

export default expenseSlice.reducer;
