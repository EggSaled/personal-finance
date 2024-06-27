import { useAppSelector } from "../app/hooks";
import { Expense } from "../types/Expense";
import './accountOverview.css';
import { ExpenseTable } from "./expensetable";

export function AccountOverview () { 
  const budget: number = useAppSelector(state => state.budget.value);
  const expense:Array<Expense> = useAppSelector(state => state.expense.value);

  const totalExpenses = expense.reduce<number>((accumulator: number, current: Expense) => current.cost + accumulator, 0)

  return (
    <div className="account-overview">
      <h2>Current Budget: {budget - totalExpenses}</h2>
      <h3>Current Expenses: </h3>
      <ExpenseTable />
    </div>
  );
}
