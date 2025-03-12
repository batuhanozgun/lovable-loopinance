
import { serviceLogger } from '../../../logging';
import { StatementBalanceCalculator } from './StatementBalanceCalculator';
import { CascadeBalanceProcessor } from './CascadeBalanceProcessor';
import { StatementStartBalanceUpdater } from './StatementStartBalanceUpdater';
import { StatementFinder } from './StatementFinder';
import { StatementRecalculator } from './StatementRecalculator';
import { TransactionChangeHandler } from './TransactionChangeHandler';

/**
 * Ekstre bakiye işlemleri düzenleyici servisi
 * Diğer tüm bakiye servislerini koordine eder
 */
export class StatementBalanceOrchestrator {
  private static logger = serviceLogger;

  // Her bir alt servis için delegasyon
  static updateStatementBalance = StatementBalanceCalculator.updateStatementBalance;
  static cascadeBalanceUpdates = CascadeBalanceProcessor.cascadeBalanceUpdates;
  static updateStatementStartBalance = StatementStartBalanceUpdater.updateStatementStartBalance;
  static findStatementsToUpdate = StatementFinder.findStatementsToUpdate;
  static handleTransactionChange = TransactionChangeHandler.handleTransactionChange;
  static recalculateAllStatements = StatementRecalculator.recalculateAllStatements;
}
