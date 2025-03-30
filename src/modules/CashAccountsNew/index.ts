
// CashAccountsNew module main entry point
// This module will replace the CashAccounts module in the future

export { CashAccountsNewView } from './views/CashAccountsNewView';
export { initCashAccountsNewModule } from './config/moduleConfig';

// Re-export from submodules
export * from './cashAccountHomepage';
