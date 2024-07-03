import { useState } from "react";
import { ExpenseForm } from "./expenseform";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addMany } from "../../app/expenseSlice";
import type { Expense } from "../../types/Expense";
import './index.css';
import { ExpenseList } from "./expenselist";

export function CreateExpense () {
  const budget = useAppSelector(state => state.budget.value);
  const currentExpenses = useAppSelector(state => state.expense.expenses);
  const dispatch = useAppDispatch();

  const [newExpenses, setNewExpenses] = useState<Array<Expense>>([]);
  const [availableBudget, setAvailableBudget] = useState<number>(
    budget - (currentExpenses.reduce<number>((accum: number, next: Expense) => accum + next.cost, 0))
  );

  const onCreateExpense = (expense: Expense) => {
    setNewExpenses([...newExpenses, expense]);
  }

  const onCommitExpense = () => {
    dispatch(addMany(newExpenses));
    setNewExpenses([]);
  }

  return (
    <div className="create-expense">
      <ExpenseForm 
        availableBudget={availableBudget} 
        setAvailableBudget={setAvailableBudget} 
      />
      <ExpenseList
        expenses={newExpenses}
        availableBudget={availableBudget}
        onCommitExpense={onCommitExpense}
      />
    </div>
  );
}
