
import { TransactionQueryService } from './query';
import { TransactionCreationService } from './TransactionCreationService';
import { TransactionBalanceService } from './TransactionBalanceService';
import { TransactionUpdateService } from './TransactionUpdateService';
import { TransactionDeletionService } from './TransactionDeletionService';

export {
  TransactionQueryService,
  TransactionCreationService,
  TransactionBalanceService,
  TransactionUpdateService,
  TransactionDeletionService
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
  
  static updateStatementBalance = TransactionBalanceService.updateStatementBalance;
}
