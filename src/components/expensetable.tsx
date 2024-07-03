import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { remove } from '../app/expenseSlice.ts';
import { notify } from '../app/messageSlice.ts';
import { Expense } from '../types/Expense.ts';
import './expensetable.css';

export function ExpenseTable() {
  const expense = useAppSelector(state => state.expense.expenses);
  const dispatch = useAppDispatch();

  const removeExpense = (expense: Expense) => {
    dispatch(remove(expense));
    dispatch(notify({
      isSuccessful: true,
      message: `Successfully removed ${expense.name}!`
    }));
  }

  // Helper function to prevent clutter in the return jsx
  const createRow = (element: Expense) => {
    return (
      <tr key={ element.id }>
        <td>{ element.name }</td>
        <td>{ element.note }</td>
        <td>${ element.cost.toFixed(2) }</td>
        <td>{ element.period == null ? "Not Recurring" : element.period }</td>
        <td>
          <button onClick={ () => removeExpense(element) }>Delete</button>
          <button>Update</button>
        </td>
      </tr>);
  };

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Note(s)</th>
          <th>Cost</th>
          <th>Recurring Period (if applicable)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { expense.map(e => createRow(e)) }
      </tbody>
    </table>);
}
