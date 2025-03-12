
import { TransactionQueryService } from './query';
import { TransactionCreationService } from './TransactionCreationService';
import { TransactionBalanceService } from './TransactionBalanceService';
import { TransactionUpdateService } from './TransactionUpdateService';
import { TransactionDeletionService } from './TransactionDeletionService';
import { StatementBalanceService } from './statement-balance';

export {
  TransactionQueryService,
  TransactionCreationService,
  TransactionBalanceService,
  TransactionUpdateService,
  TransactionDeletionService,
  StatementBalanceService
};

/**
 * Tüm İşlem işlemleri için ana erişim noktası
 */
export class TransactionService {
  static getTransactionById = TransactionQueryService.getTransactionById;
  static getTransactionsByAccountId = TransactionQueryService.getTransactionsByAccountId;
  static getTransactionsByStatementId = TransactionQueryService.getTransactionsByStatementId;
  
  static createTransaction = TransactionCreationService.createTransaction;
  static updateTransaction = TransactionUpdateService.updateTransaction;
  static deleteTransaction = TransactionDeletionService.deleteTransaction;
  
  // Bakiye güncelleme servisleri
  static updateStatementBalance = StatementBalanceService.updateStatementBalance;
  static cascadeBalanceUpdates = StatementBalanceService.cascadeBalanceUpdates;
  static updateStatementStartBalance = StatementBalanceService.updateStatementStartBalance;
  static findStatementsToUpdate = StatementBalanceService.findStatementsToUpdate;
  static handleTransactionChange = StatementBalanceService.handleTransactionChange;
  static recalculateAllStatements = StatementBalanceService.recalculateAllStatements;
}
