import './BudgetForm.css';

export function BudgetForm() {
  return (
    <form className="budget-form">
      <fieldset>
        <legend>Are you removing or adding money to your budget?</legend>
        <label htmlFor="withdraw">Withdraw </label>
        <input 
          id="withdraw" 
          type="radio" 
          name="budget-action" 
          value="withdraw" 
          defaultChecked 
        />
        <label htmlFor="deposit">Deposit </label>
        <input 
          id="deposit" 
          type="radio" 
          name="budget-action" 
          value="deposit" 
        />
      </fieldset>
      <label htmlFor="amount">Enter Amount: </label>
      <input id="amount" type="number" name="amount" />
      <button>Apply Changes</button>
    </form>);
}
