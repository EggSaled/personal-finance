import { FormEvent, useState } from "react";
import type { Expense } from '../../types/Expense.ts';
import './expenseform.css';

interface props {
  availableBudget: number,
  setAvailableBudget: (availableBudget: number) => void,
  onCreateExpense: (expense: Expense) => void
};

export function ExpenseForm({ availableBudget, setAvailableBudget, onCreateExpense }: props) {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    // Extracting formdata
    const target = event.target as typeof event.target & {
      "expense-name": { value: string },
      "expense-note": { value: string },
      "dollars": { value: number },
      "cents" : { value: number },
      "expense-period": { value: Expense["period"] }
    };

    const name: string = target["expense-name"].value.trim();
    const note: string = target["expense-note"].value.trim();
    const dollars: number = Number(target.dollars.value);
    const cents: number = Number(target.cents.value);
    
    // period can be null if the user doesn't specify the expense as a recurring expense.
    let period: Expense["period"] = null;

    if( isRecurring ) {
      // expect a Period
      period = target["expense-period"].value;
    }

    /* =========================================================================
     * Converting cost to cents here instead of in the reducer for now.
     *
     * NOTE: Decide whether the conversion to cents should be done in the reducer
     * or continue to be calculated in the submitHandler (for expenses only). 
     * ========================================================================= */

    const newExpense: Expense = {
      id: null,
      name,
      note,
      cost: ((dollars * 100) + cents),
      isRecurring,
      period
    };

    setAvailableBudget(availableBudget - ((dollars * 100) + cents));
    onCreateExpense(newExpense);
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
      <fieldset>
        <legend>Cost: </legend>
        <div>
          <label htmlFor="dollars">$ </label>
          <input 
            type="number" 
            id="dollars" 
            name="dollars" 
            min={0} 
            required
          />
          <label htmlFor="cents"> . </label>
          <input 
            type="number" 
            id="cents" 
            name="cents" 
            min={0} 
            max={99} 
            required
          />
        </div>
      </fieldset>
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
