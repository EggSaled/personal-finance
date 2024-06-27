import { FormEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { add } from "../app/expenseSlice";
import type { Expense } from '../types/Expense.ts';
import './ExpenseForm.css';

export function ExpenseForm() {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    // Extracting formdata
    const target = event.target as typeof event.target & {
      "expense-name": { value: string },
      "expense-note": { value: string },
      "expense-cost": { value: number },
      "expense-period": { value: Expense["period"] }
    };

    const name: string = target["expense-name"].value.trim();
    const note: string = target["expense-note"].value.trim();
    const cost: number = Number(target["expense-cost"].value);
    
    // period can be null if the user doesn't specify the expense as a recurring expense.
    let period: Expense["period"] = null;

    if( isRecurring ) {
      // expect a Period
      period = target["expense-period"].value;
    }

    // create new Expense, dispatch to expense state
    const newExpense: Expense = {
      name,
      note,
      cost,
      isRecurring,
      period
    };

    dispatch(add(newExpense));
  };

  return (
    <form onSubmit={submitHandler} className="expense-form">
      <label htmlFor="expense-name">Name: </label>
      <input 
        type="text" 
        id="expense-name" 
        name="expense-name" 
        required
      />
      <label htmlFor="expense-note">Note(s): </label>
      <input 
        type="text" 
        id="expense-note" 
        name="expense-note" 
      />
      <label htmlFor="expense-cost">Cost: </label>
      <input 
        type="number" 
        id="expense-cost" 
        name="expense-cost" 
        step={0.01}
        required
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
          <select id="expense-period" name="expense-period" required>
            <option value="">(select one)</option>
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
