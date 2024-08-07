import { CreateExpense } from './components/createExpense/index.tsx';
import { BudgetForm } from './components/budgetform.tsx';
import { AccountOverview } from './components/AccountOverview.tsx'; // macOS is forcing the change from accountoverview.tsx to AccountOverview.tsx
import { Header } from './components/header';
import './App.css';
import { useAppSelector } from './app/hooks';
import { Toast } from './components/toast';

function App() {
  const currentComponent = [ <AccountOverview />, <BudgetForm />, <CreateExpense /> ];

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
