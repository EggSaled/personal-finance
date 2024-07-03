import { FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { withdraw, deposit } from '../app/budgetSlice.ts';
import { notify } from '../app/messageSlice.ts';
import './budgetform.css';

export function BudgetForm() {
  const budget: number = useAppSelector(state => state.budget.value);
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
      dispatch(notify(
        {
          isSuccessful: true, 
          message: `Successfully withdrew ${amount}!`
        }));

    } else {
      dispatch(deposit(amount));
      dispatch(notify(
        {
          isSuccessful: true, 
          message: `Successfully deposited \$${amount.toFixed(2)}!`
        }));
    }
  };

  return (
    <form onSubmit={submitHandler} className="budget-form">
      <fieldset>
        <legend>Are you removing or adding money to your budget? (Current Budget: ${ budget.toFixed(2) })</legend>
        <label htmlFor="deposit">Deposit 
        <input 
          id="deposit" 
          type="radio" 
          name="action" 
          value="deposit" 
          defaultChecked 
        />
        </label>
        <label htmlFor="withdraw">Withdraw 
        <input 
          id="withdraw" 
          type="radio" 
          name="action" 
          value="withdraw" 
        />
        </label>
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
