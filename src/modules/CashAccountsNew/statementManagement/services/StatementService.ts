
/**
 * Ekstre yönetimi için ana servis
 */
import { TransactionQueryService } from './transaction/TransactionQueryService';
import { TransactionDeleteService } from './transaction/TransactionDeleteService';
import { TransactionUpdateService } from './transaction/TransactionUpdateService';
import { StatementQueryService } from './core/query/StatementQueryService';
import { StatementUpdateService } from './core/update/StatementUpdateService';
import { StatementCreationService } from './core/creation/StatementCreationService';
import { StatementBalanceCalculationService } from './core/calculation/StatementBalanceCalculationService';
import { FutureStatementService } from './automation/FutureStatementService';

export class StatementService {
  // Ekstre sorgulama
  static getAccountStatements = StatementQueryService.getAccountStatements;
  static getAccountStatement = StatementQueryService.getAccountStatement;

  // Ekstre oluşturma
  static createStatement = StatementCreationService.createStatement;

  // Ekstre güncelleme
  static updateStatement = StatementUpdateService.updateStatement;

  // Ekstre bakiye hesaplama
  static recalculateStatementBalance = StatementBalanceCalculationService.recalculateStatementBalance;

  // İşlem sorgulama
  static getTransactionsByStatementId = TransactionQueryService.getTransactionsByStatementId;
  
  // İşlem silme
  static deleteTransaction = TransactionDeleteService.deleteTransaction;
  
  // İşlem güncelleme
  static updateTransaction = TransactionUpdateService.updateTransaction;

  // Gelecek ekstre oluşturma
  static checkAccountFutureStatements = FutureStatementService.checkAccountFutureStatements;
  static createFutureStatementsForAccount = FutureStatementService.createFutureStatementsForAccount;
}
