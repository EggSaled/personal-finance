import { useAppSelector } from "../app/hooks";
import { Expense } from "../types/Expense";
import { ExpenseTable } from "./expensetable";
import './accountoverview.css';

export function AccountOverview () { 
  const budget: number = useAppSelector(state => state.budget.value);
  const expense: Array<Expense> = useAppSelector(state => state.expense.expenses);

  const totalExpenses = expense.reduce<number>((accumulator: number, current: Expense) => current.cost + accumulator, 0)

  return (
    <div className="account-overview">
      <h2>Available Budget: ${ ((budget - totalExpenses) / 100).toFixed(2) }</h2>
      <h3>Current Expenses: </h3>
      <ExpenseTable />
    </div>
  );
}
