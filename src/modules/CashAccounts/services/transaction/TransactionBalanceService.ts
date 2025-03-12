
import { serviceLogger } from '../../logging';
import { StatementBalanceService } from './statement-balance';

/**
 * İşlem bakiye etki hesaplama servisi
 * @deprecated Bu servis parçalara ayrıldı. Bunun yerine StatementBalanceService'i kullanın.
 */
export class TransactionBalanceService {
  private static logger = serviceLogger;

  // StatementBalanceService'e delegasyon yapılan metodlar
  static updateStatementBalance = StatementBalanceService.updateStatementBalance;
  static cascadeBalanceUpdates = StatementBalanceService.cascadeBalanceUpdates;
  static updateStatementStartBalance = StatementBalanceService.updateStatementStartBalance;
  static findStatementsToUpdate = StatementBalanceService.findStatementsToUpdate;
  static handleTransactionChange = StatementBalanceService.handleTransactionChange;
  static recalculateAllStatements = StatementBalanceService.recalculateAllStatements;
}
