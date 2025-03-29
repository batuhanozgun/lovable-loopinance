
// CashAccountsNew module main entry point
import { CashAccountsView } from './presentation/views/CashAccountsView';
import { CreateCashAccountView } from './presentation/views/CreateCashAccountView';
import { CashAccountDetailView } from './presentation/views/CashAccountDetailView';

// Contexts
export { CashAccountsProvider } from './presentation/contexts/CashAccountsContext';

// Export views for use in routing
export {
  CashAccountsView,
  CreateCashAccountView,
  CashAccountDetailView
};

// Re-export hooks for external use
export { useCashAccounts } from './presentation/hooks/useCashAccounts';
export { useCashAccount } from './presentation/hooks/useCashAccount';
export { useCashAccountForm } from './presentation/hooks/useCashAccountForm';

// Initialize module
export const initCashAccountsModule = () => {
  // Future initialization logic will go here
  console.log('CashAccountsNew module initialized');
};
