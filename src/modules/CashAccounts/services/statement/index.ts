
/**
 * Tüm Ekstre servisleri için ana erişim noktası
 */

// Core servisler
import { StatementQueryService } from './core/query/StatementQueryService';
import { StatementCreationService } from './core/creation/StatementCreationService';
import { StatementUpdateService } from './core/update/StatementUpdateService';
import { StatementPeriodService } from './core/period/StatementPeriodService';

// Otomasyon servisleri
import { StatementOrchestrationService } from './automation/orchestration/StatementOrchestrationService';
import { StatementClosingService } from './automation/lifecycle/StatementClosingService';
import { StatementStatusManagerService } from './automation/lifecycle/StatementStatusManagerService';
import { AccountStatementCheckService } from './automation/checking/AccountStatementCheckService';
import { SingleAccountStatementService } from './automation/checking/SingleAccountStatementService';
import { StatementPeriodCheckService } from './automation/checking/StatementPeriodCheckService';
import { StatementValidationService } from './automation/validation/StatementValidationService';

// Shared içerikler
export * from './shared/types';
export * from './shared/constants';
export * from './shared/utils';

// Core servisler export
export {
  StatementQueryService,
  StatementCreationService,
  StatementUpdateService,
  StatementPeriodService
};

// Otomasyon servisleri export
export {
  StatementOrchestrationService,
  StatementClosingService,
  StatementStatusManagerService,
  AccountStatementCheckService,
  SingleAccountStatementService,
  StatementPeriodCheckService,
  StatementValidationService
};

/**
 * Tüm Ekstre işlemleri için ana erişim noktası
 */
export class StatementService {
  // Orkestrasyon servisi instance'ı
  private static orchestrationService = new StatementOrchestrationService();

  // Query işlemleri
  static getStatementById = StatementQueryService.getStatementById;
  static getStatementsByAccountId = StatementQueryService.getStatementsByAccountId;
  static getCurrentStatement = StatementQueryService.getCurrentStatement;
  
  // Creation işlemleri
  static createStatement = StatementCreationService.createStatement;
  static createNextStatement = StatementCreationService.createNextStatement;
  
  // Update işlemleri
  static updateStatementStatus = StatementUpdateService.updateStatementStatus;
  static updateStatementBalances = StatementUpdateService.updateStatementBalances;
  
  // Period hesaplama işlemleri
  static calculateNextPeriod = StatementPeriodService.calculateNextPeriod;
  static calculateCurrentPeriod = StatementPeriodService.calculateCurrentPeriod;
  static calculateNextMonthPeriod = StatementPeriodService.calculateNextMonthPeriod;
  
  // Otomasyon işlemleri (StatementAutoCreationService'den taşınan)
  static checkAndCreateStatementsForAllAccounts = () => 
    StatementService.orchestrationService.checkAndCreateStatementsForAllAccounts();
    
  static checkAndCreateStatementForAccount = (account) => 
    StatementService.orchestrationService.checkAndCreateStatementForAccount(account);
    
  static closeExpiredStatementsAndCreateNew = () => 
    StatementService.orchestrationService.closeExpiredStatementsAndCreateNew();
    
  static updateFutureStatementsStatus = () => 
    StatementService.orchestrationService.updateFutureStatementsStatus();
}
