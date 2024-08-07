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
      dollars: { value: number },
      cents: { value: number }
    };

    const action: string = target.action.value;
    const dollars: number = Number(target.dollars.value);
    const cents: number = Number(target.cents.value);
  
    if(action === "withdraw"){
      dispatch(withdraw(dollars, cents));
      dispatch(notify(
        {
          isSuccessful: true, 
          message: `Successfully withdrew \$${ dollars }.${ cents }!`
        }));

    } else {
      dispatch(deposit(dollars, cents));
      dispatch(notify(
        {
          isSuccessful: true, 
          message: `Successfully deposited \$${ dollars }.${ cents }!`
        }));
    }
  };

  return (
    <form onSubmit={submitHandler} className="budget-form">
      <fieldset>
        <legend>Are you removing or adding money to your budget? (Current Budget: ${ (budget / 100).toFixed(2) })</legend>
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
      <fieldset>
        <legend>Enter Amount: </legend>
        <div>
          <label htmlFor="dollars">$ </label>
          <input 
            id="dollars" 
            type="number" 
            name="dollars"
            min={0} 
          />
          <label htmlFor="cents"> . </label>
          <input 
            id="cents" 
            type="number" 
            name="cents"
            min={0} 
            max={99}
          />
        </div>
      </fieldset>
      <button>Apply Changes</button>
    </form>);
}
