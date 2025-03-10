
import { TransactionQueryService } from './TransactionQueryService';
import { TransactionCreationService } from './TransactionCreationService';
import { TransactionBalanceService } from './TransactionBalanceService';

export {
  TransactionQueryService,
  TransactionCreationService,
  TransactionBalanceService
};

/**
 * Tüm İşlem işlemleri için ana erişim noktası
 */
export class TransactionService {
  static getTransactionById = TransactionQueryService.getTransactionById;
  static getTransactionsByAccountId = TransactionQueryService.getTransactionsByAccountId;
  static getTransactionsByStatementId = TransactionQueryService.getTransactionsByStatementId;
  
  static createTransaction = TransactionCreationService.createTransaction;
  
  static updateStatementBalance = TransactionBalanceService.updateStatementBalance;
}
