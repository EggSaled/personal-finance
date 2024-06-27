/* Expense removes available budget. */
export type Expense = {
  name: string,
  note: string,
  cost: number,
  isRecurring: boolean,
  period: "daily" | "weekly" | "monthly" | "yearly" | null
};

/*
const test: Expense = {
  name: "hello",
  note: "",
  cost: 22,
  isRecurring: false,
  period: null
};
*/
