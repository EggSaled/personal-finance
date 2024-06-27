import { FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { withdraw, deposit } from '../app/budgetSlice.ts';
import './BudgetForm.css';

export function BudgetForm() {
  const budget = useAppSelector(state => state.budget.value);
  const dispatch = useAppDispatch();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      action: { value: "withdraw" | "deposit" },
      amount: { value: number }
    };

    const action: string = target.action.value;
    const amount: number = Number(target.amount.value);
  
    if(action === "withdraw"){
      dispatch(withdraw(amount));
    } else {
      dispatch(deposit(amount));
    }
  };

  return (
    <form onSubmit={submitHandler} className="budget-form">
      <fieldset>
        <legend>Are you removing or adding money to your budget? (Current Budget: {budget})</legend>
        <label htmlFor="withdraw">Withdraw </label>
        <input 
          id="withdraw" 
          type="radio" 
          name="action" 
          value="withdraw" 
          defaultChecked 
        />
        <label htmlFor="deposit">Deposit </label>
        <input 
          id="deposit" 
          type="radio" 
          name="action" 
          value="deposit" 
        />
      </fieldset>
      <label htmlFor="amount">Enter Amount: </label>
      <input 
        id="amount" 
        type="number" 
        name="amount" 
      />
      <button>Apply Changes</button>
    </form>);
}
