import { useAppDispatch } from '../app/hooks.ts';
import { change } from '../app/indexSlice.ts';
import './header.css';

export function Header() {
  const dispatch = useAppDispatch();

  return (
    <header>
      <h1>Personal Finance App Thingy I Don't Know</h1>
      <ul className="nav-list">
        <li>
          <button onClick={() => dispatch(change(0))}>Home</button>
        </li>
        <li>
          <button onClick={() => dispatch(change(1))}>Update Budget</button>
        </li>
        <li>
          <button onClick={() => dispatch(change(2))}>Add an Expense</button>
        </li>
      </ul>
    </header>);
}
