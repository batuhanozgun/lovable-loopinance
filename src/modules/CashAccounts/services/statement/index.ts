
import { StatementQueryService } from './StatementQueryService';
import { StatementCreationService } from './StatementCreationService';
import { StatementUpdateService } from './StatementUpdateService';

export {
  StatementQueryService,
  StatementCreationService,
  StatementUpdateService
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
}
