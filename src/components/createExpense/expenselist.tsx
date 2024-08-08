/* expenselist.tsx - unlike expensetable, expenselist will contain
 * expenses not yet "committed" to the record; expenses created here
 * will not show on expense table until they are "committed". */

import { Expense } from "../../types/Expense";

interface props {
  expenses: Array<Expense>
  availableBudget: number,
  onCommitExpense: () => void,
  onClearExpenses: () => void
}

export function ExpenseList ({ expenses, availableBudget, onCommitExpense, onClearExpenses }: props){

  return (
    <div>
      <h3>New Expenses</h3>
      <ul>
        { expenses.length === 0 ? 
          <em>No expenses recently created.</em> : 
          expenses.map((e: Expense, i:number) => <li key={i}>{e.name} - ${ (e.cost / 100).toFixed(2) }</li>) 
        }
      </ul>
      <em>Adding these onto your account overview will change your available budget to: ${ ( availableBudget / 100 ).toFixed(2) }</em>
      <br />
      <span>
        <button 
          onClick={onCommitExpense} 
          disabled={expenses.length === 0}
        >
          Commit Expenses
        </button>
        <button 
          onClick={onClearExpenses} 
          disabled={expenses.length === 0}
        >
          Clear New Expenses
        </button>
      </span>
    </div>
  );
};
