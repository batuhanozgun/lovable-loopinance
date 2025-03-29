
import { createLogger } from '@/modules/Logging';

// Create module logger
const cashAccountsLogger = createLogger('CashAccountsNew');

// Export domain-specific loggers
export const accountsLogger = cashAccountsLogger.createSubLogger('Accounts');
export const statementsLogger = cashAccountsLogger.createSubLogger('Statements');
export const transactionsLogger = cashAccountsLogger.createSubLogger('Transactions');

// Operation loggers
export const operationsLogger = cashAccountsLogger.createSubLogger('Operations');
export const formsLogger = cashAccountsLogger.createSubLogger('Forms');
export const uiLogger = cashAccountsLogger.createSubLogger('UI');

// Main logger for the CashAccountsNew module
export default cashAccountsLogger;
