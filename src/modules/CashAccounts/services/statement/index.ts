
import { StatementQueryService } from './StatementQueryService';
import { StatementCreationService } from './StatementCreationService';
import { StatementUpdateService } from './StatementUpdateService';
import { StatementPeriodService } from './StatementPeriodService';
import { StatementAutoCreationService } from './StatementAutoCreationService';

export {
  StatementQueryService,
  StatementCreationService,
  StatementUpdateService,
  StatementPeriodService,
  StatementAutoCreationService
};

/**
 * Tüm Ekstre işlemleri için ana erişim noktası
 */
export class StatementService {
  static getStatementById = StatementQueryService.getStatementById;
  static getStatementsByAccountId = StatementQueryService.getStatementsByAccountId;
  static getCurrentStatement = StatementQueryService.getCurrentStatement;
  
  static createStatement = StatementCreationService.createStatement;
  static createNextStatement = StatementCreationService.createNextStatement;
  
  static updateStatementStatus = StatementUpdateService.updateStatementStatus;
  static updateStatementBalances = StatementUpdateService.updateStatementBalances;
  
  static calculateNextPeriod = StatementPeriodService.calculateNextPeriod;
  static calculateCurrentPeriod = StatementPeriodService.calculateCurrentPeriod;
  static calculateNextMonthPeriod = StatementPeriodService.calculateNextMonthPeriod;
  
  static checkAndCreateStatementsForAllAccounts = StatementAutoCreationService.checkAndCreateStatementsForAllAccounts;
  static checkAndCreateStatementForAccount = StatementAutoCreationService.checkAndCreateStatementForAccount;
  static closeExpiredStatementsAndCreateNew = StatementAutoCreationService.closeExpiredStatementsAndCreateNew;
}
