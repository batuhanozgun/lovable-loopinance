
// CashAccountsNew module main entry point
// This module will replace the CashAccounts module in the future

export { CashAccountsNewView } from './views/CashAccountsNewView';
export { CreateCashAccountView } from './accountManagement/views/CreateCashAccountView';
export { initCashAccountsNewModule } from './config/moduleConfig';
export { StatementsListView, StatementDetailView } from './statementManagement/views';

// Re-export from submodules
export * from './cashAccountHomepage';
export * from './accountManagement';
export * from './statementManagement';
