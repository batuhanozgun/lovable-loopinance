
import { StatementQueryService } from './StatementQueryService';
import { StatementCreationService } from './StatementCreationService';
import { StatementUpdateService } from './StatementUpdateService';
import { StatementPeriodService } from './StatementPeriodService';
import { StatementStatusService } from './StatementStatusService';
import { StatementBalanceService } from './StatementBalanceService';

export {
  StatementQueryService,
  StatementCreationService,
  StatementUpdateService,
  StatementPeriodService,
  StatementStatusService,
  StatementBalanceService
};

/**
 * Tüm Ekstre işlemleri için ana erişim noktası
 */
export class StatementService {
  // Sorgulama işlemleri
  static getStatementById = StatementQueryService.getStatementById;
  static getStatementsByAccountId = StatementQueryService.getStatementsByAccountId;
  static getCurrentStatement = StatementQueryService.getCurrentStatement;
  static getAccountInitialBalance = StatementQueryService.getAccountInitialBalance;
  
  // Oluşturma işlemleri
  static createStatement = StatementCreationService.createStatement;
  static createNextStatement = StatementCreationService.createNextStatement;
  
  // Güncelleme işlemleri
  static updateStatementStatus = StatementUpdateService.updateStatementStatus;
  static updateStatementBalances = StatementUpdateService.updateStatementBalances;
  
  // Periyot hesaplama işlemleri
  static calculateClosingDate = StatementPeriodService.calculateClosingDate;
  static calculateNextClosingDate = StatementPeriodService.calculateNextClosingDate;
  static calculateStatementPeriod = StatementPeriodService.calculateStatementPeriod;
  static calculateNextPeriod = StatementPeriodService.calculateNextPeriod;
  static validatePeriod = StatementPeriodService.validatePeriod;
  
  // Durum yönetimi işlemleri
  static closeStatement = StatementStatusService.closeStatement;
  static findStatementForDate = StatementStatusService.findStatementForDate;
  static validateStatusTransition = StatementStatusService.validateStatusTransition;
  
  // Bakiye hesaplama işlemleri
  static recalculateStatementBalances = StatementBalanceService.recalculateStatementBalances;
  static calculateTransactionTotals = StatementBalanceService.calculateTransactionTotals;
  static calculateAccountCurrentBalance = StatementBalanceService.calculateAccountCurrentBalance;
}
