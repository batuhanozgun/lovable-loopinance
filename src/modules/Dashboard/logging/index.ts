
import { createLogger } from '@/modules/Logging';

// Dashboard modülü için temel logger
const logger = createLogger('Dashboard');

// Alt bileşenler için logger'lar
const financialSummaryLogger = logger.createSubLogger('FinancialSummary');
const recentTransactionsLogger = logger.createSubLogger('RecentTransactions');
const budgetGoalsLogger = logger.createSubLogger('BudgetGoals');

export {
  logger as DashboardLogger,
  financialSummaryLogger,
  recentTransactionsLogger,
  budgetGoalsLogger
};
