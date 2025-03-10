
import { createLogger } from '@/modules/Logging';

// CashAccounts modülü için temel logger
const logger = createLogger('CashAccounts');

// CashAccounts altındaki alt modüller için logger'lar
const accountLogger = logger.createSubLogger('Account');
const formLogger = logger.createSubLogger('Form');
const serviceLogger = logger.createSubLogger('Service');
const statementsLogger = logger.createSubLogger('Statements');
const transactionsLogger = logger.createSubLogger('Transactions');

export {
  logger as cashAccountsLogger,
  accountLogger,
  formLogger,
  serviceLogger,
  statementsLogger,
  transactionsLogger
};
