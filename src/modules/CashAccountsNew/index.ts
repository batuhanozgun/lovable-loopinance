
// CashAccountsNew module main entry point
// This module will replace the CashAccounts module in the future

export { CashAccountsNewView } from './views/CashAccountsNewView';
export { CreateCashAccountView } from './accountManagement/views/CreateCashAccountView';
export { initCashAccountsNewModule } from './config/moduleConfig';

// Re-export from submodules
export * from './cashAccountHomepage';
export * from './accountManagement';
