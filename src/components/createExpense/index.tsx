import { useState } from "react";
import { ExpenseForm } from "./expenseform";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addMany, addOne } from "../../app/expenseSlice";
import { notify } from "../../app/messageSlice";
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
    if(newExpenses.length === 1){
      dispatch(addOne(newExpenses[0]));
      dispatch(notify({
        isSuccessful: true,
        message: `Added new expense: ${newExpenses[0].name}!`
      }));
    } else {
      dispatch(addMany(newExpenses));
      dispatch(notify({
        isSuccessful: true,
        message: `Added ${newExpenses.length} new expenses to record!`
      }));
    }
    setNewExpenses([]);
  }

  const onClearExpenses = () => {
    setNewExpenses([]);
    // resetting availableBudget
    setAvailableBudget(budget - (currentExpenses.reduce<number>((accum: number, next: Expense) => accum + next.cost, 0)));
  };

  return (
    <div className="create-expense">
      <ExpenseForm 
        availableBudget={availableBudget} 
        setAvailableBudget={setAvailableBudget} 
        onCreateExpense={onCreateExpense}
      />
      <ExpenseList
        expenses={newExpenses}
        availableBudget={availableBudget}
        onCommitExpense={onCommitExpense}
        onClearExpenses={onClearExpenses}
      />
    </div>
  );
}
