import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import expenseReducer from './expenseSlice.ts';
import indexReducer from "./indexSlice.ts";

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    expense: expenseReducer,
    index: indexReducer
  }
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
