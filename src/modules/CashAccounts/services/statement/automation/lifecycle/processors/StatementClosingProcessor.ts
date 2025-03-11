
/**
 * Ekstreleri kapatan işlemci
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../../logging';
import { AccountStatement, StatementStatus } from '../../../../../types';
import { StatementUpdateService } from '../../../core/update/StatementUpdateService';
import { AccountStatementProcessResult } from '../../../shared/types';

export class StatementClosingProcessor {
  private logger: ILogger;
  private updateService: typeof StatementUpdateService;

  constructor(
    logger: ILogger = serviceLogger,
    updateService: typeof StatementUpdateService = StatementUpdateService
  ) {
    this.logger = logger;
    this.updateService = updateService;
  }

  /**
   * Bir ekstreyi kapatır
   */
  async closeStatement(statement: AccountStatement): Promise<AccountStatementProcessResult> {
    try {
      // Ekstre durumunu kapat
      const closeResult = await this.updateService.updateStatementStatus(
        statement.id, 
        StatementStatus.CLOSED
      );
      
      if (!closeResult.success) {
        this.logger.error('Ekstre kapatılırken hata', { 
          statementId: statement.id, 
          error: closeResult.error 
        });
        
        return {
          statementId: statement.id,
          accountId: statement.account_id,
          action: 'close',
          success: false,
          message: closeResult.error || 'Ekstre kapatılırken hata oluştu'
        };
      }
      
      this.logger.info('Ekstre başarıyla kapatıldı', {
        statementId: statement.id,
        accountId: statement.account_id
      });
      
      // Başarılı kapatma bilgisi ekle
      return {
        statementId: statement.id,
        accountId: statement.account_id,
        action: 'close',
        success: true,
        message: 'Ekstre başarıyla kapatıldı'
      };
    } catch (error) {
      this.logger.error('Ekstre kapatma işlemi sırasında beklenmeyen hata', { 
        statementId: statement.id,
        accountId: statement.account_id, 
        error 
      });
      
      return {
        statementId: statement.id,
        accountId: statement.account_id,
        action: 'close',
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
