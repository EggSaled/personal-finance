import { useState } from "react";
import './ExpenseForm.css';

export function ExpenseForm() {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  return (
    <form className="expense-form">
      <label htmlFor="expense-name">Name: </label>
      <input 
        type="text" 
        id="expense-name" 
        name="expense-name" 
      />
      <label htmlFor="expense-cost">Cost: </label>
      <input 
        type="number" 
        id="expense-cost" 
        name="expense-cost" 
      />
      <label htmlFor="expense-recurring">
        Will this be a Recurring Expense?
      </label>
      <input 
        type="checkbox" 
        id="expense-recurring"
        name="expense-recurring"
        onClick={() => setIsRecurring(!isRecurring)} 
      />
      { isRecurring ?
        <>
          <label htmlFor="expense-period">Please Select Recurring period: </label> 
          <select id="expense-period" name="expense-period">
            <option value={-1}>(select one)</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </>
        : 
        <></> 
      }
      <button>Create New Expense</button>
    </form>);
}
