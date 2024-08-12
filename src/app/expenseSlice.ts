import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { Expense } from "../types/Expense";
import type { RootState } from "./store";

export interface ExpenseState {
  expenses: Array<Expense>
};

const initialState = {
  expenses: []
} as ExpenseState;

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<Expense>) => {
      if(state.expenses.length === 0) return;

      state.expenses = state.expenses.filter(e => e.id !== action.payload.id);
    },
    addOne: { 
      reducer(state, action: PayloadAction<Expense>) {
        state.expenses.push(action.payload);
      },
      prepare(expense: Expense) {
        expense.id = nanoid();
        return { 
          payload: expense
        };
      },
    },
    addMany: { 
      reducer(state, action: PayloadAction<Array<Expense>>) {
        action.payload.forEach((element: Expense) => {
          state.expenses.push(element);
        });
      },
      prepare(expenses: Array<Expense>) {
        expenses.forEach((e) => {
          e.id = nanoid();
          return;
        });

        return { 
          payload: expenses 
        };
      }
    }
  }
});

export const { remove, addOne, addMany } = expenseSlice.actions;

export const expenseSelect = (state: RootState) => state.expense.expenses;

export default expenseSlice.reducer;
