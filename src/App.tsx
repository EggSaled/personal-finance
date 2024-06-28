import { ExpenseForm } from './components/ExpenseForm';
import { BudgetForm } from './components/BudgetForm';
import { AccountOverview } from './components/AccountOverview';
import { Header } from './components/header';
import './App.css';
import { useAppSelector } from './app/hooks';
import { Toast } from './components/toast';

function App() {
  const currentComponent = [ <AccountOverview />, <BudgetForm />, <ExpenseForm /> ];

  const index = useAppSelector(state => state.index.value);

  return (
    <>
      <Header />
      <div className="main-container">
        { currentComponent[index] }
        <Toast />
      </div>
    </>);
}

export default App
