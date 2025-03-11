
import { AccountStatement } from '../../types';
import { SingleStatementResponse, StatementListResponse } from './shared/types';
import { StatementCreationService } from './core/creation/StatementCreationService';
import { StatementUpdateService } from './core/update/StatementUpdateService';
import { StatementPeriodService } from './core/period/StatementPeriodService';
import { StatementQueryService } from './core/query/StatementQueryService';
import { serviceLogger } from '../../logging';

/**
 * Ekstre işlemleri için ana servis
 */
export class StatementService {
  /**
   * Belirli bir hesaba ait ekstreleri getirir
   */
  static async getStatementsByAccountId(accountId: string): Promise<StatementListResponse> {
    try {
      serviceLogger.debug('StatementService.getStatementsByAccountId called', { accountId });
      const result = await StatementQueryService.getStatementsByAccountId(accountId);
      
      // Servis cevabını loglama
      serviceLogger.debug('StatementQueryService.getStatementsByAccountId result', { 
        success: result.success, 
        dataLength: result.data?.length || 0,
        error: result.error 
      });
      
      return result;
    } catch (error) {
      serviceLogger.error('Error in StatementService.getStatementsByAccountId', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error in StatementService'
      };
    }
  }

  /**
   * ID'ye göre bir ekstre getirir
   */
  static async getStatementById(id: string): Promise<SingleStatementResponse> {
    try {
      return await StatementQueryService.getStatementById(id);
    } catch (error) {
      serviceLogger.error('Error in StatementService.getStatementById', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Hesap için dönem yaratma servisi
   */
  static getPeriodService(): StatementPeriodService {
    return new StatementPeriodService();
  }

  /**
   * Ekstre oluşturma servisi
   */
  static getCreationService(): StatementCreationService {
    return new StatementCreationService();
  }

  /**
   * Ekstre güncelleme servisi
   */
  static getUpdateService(): StatementUpdateService {
    return new StatementUpdateService();
  }
}
