/* Expense removes available budget. */
// if id is null, then it HAS NOT been added to the Redux state.
// when an expense is added to the redux state, it will be assigned
// an id.
export type Expense = {
  id: number | string | null,
  name: string,
  note: string,
  cost: number,
  isRecurring: boolean,
  period: "daily" | "weekly" | "monthly" | "yearly" | null
};
