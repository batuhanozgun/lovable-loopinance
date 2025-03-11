
/**
 * Ekstre durum yönetimi servisi
 */
import { format, isAfter, startOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { AccountStatement, StatementStatus } from '../../../../types';
import { StatementUpdateService } from '../../core/update/StatementUpdateService';
import { determineStatementStatus } from '../../shared/utils';

export class StatementStatusManagerService {
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
   * Ekstre durumunu tarih bilgisine göre günceller
   */
  async updateStatementStatusBasedOnDate(
    statementId: string, 
    startDate: Date, 
    currentDate: Date
  ) {
    const newStatus = determineStatementStatus(startDate, currentDate);
    return await this.updateService.updateStatementStatus(statementId, newStatus);
  }

  /**
   * Tüm FUTURE statüsündeki ekstreleri kontrol edip, tarihi gelenleri OPEN statüsüne günceller
   */
  async updateFutureStatements() {
    try {
      this.logger.debug('Future statüsündeki ekstreleri kontrol etme işlemi başlatıldı');
      
      const today = new Date();
      const todayStr = format(today, 'yyyy-MM-dd');
      
      // Başlangıç tarihi bugün veya daha önceki bir tarih olan ve FUTURE statüsündeki ekstreleri bul
      const { data: futureStatements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('status', StatementStatus.FUTURE)
        .lte('start_date', todayStr);
      
      if (error) {
        this.logger.error('Future statüsündeki ekstreleri bulurken hata', { error });
        return { 
          success: false, 
          message: 'Future statüsündeki ekstreleri bulurken hata: ' + error.message 
        };
      }
      
      if (!futureStatements || futureStatements.length === 0) {
        this.logger.info('Statüsü güncellenecek Future ekstre bulunamadı');
        return { 
          success: true, 
          message: 'Statüsü güncellenecek Future ekstre bulunamadı' 
        };
      }
      
      const results = [];
      
      // Her bir FUTURE statüsündeki ekstre için
      for (const statement of futureStatements) {
        try {
          // Ekstre durumunu OPEN olarak güncelle
          const updateResult = await this.updateService.updateStatementStatus(
            statement.id, 
            StatementStatus.OPEN
          );
          
          if (!updateResult.success) {
            this.logger.error('Ekstre statüsü güncellenirken hata', { 
              statementId: statement.id, 
              error: updateResult.error 
            });
            
            results.push({
              statementId: statement.id,
              accountId: statement.account_id,
              success: false,
              message: updateResult.error
            });
            
            continue;
          }
          
          this.logger.info('Ekstre statüsü Future\'dan Open\'a güncellendi', { 
            statementId: statement.id,
            accountId: statement.account_id,
            period: `${statement.start_date} - ${statement.end_date}`
          });
          
          results.push({
            statementId: statement.id,
            accountId: statement.account_id,
            success: true,
            message: 'Ekstre statüsü Future\'dan Open\'a güncellendi'
          });
        } catch (statementError) {
          this.logger.error('Ekstre statüsü güncellenirken beklenmeyen hata', { 
            statementId: statement.id, 
            error: statementError 
          });
          
          results.push({
            statementId: statement.id,
            accountId: statement.account_id,
            success: false,
            message: statementError instanceof Error ? statementError.message : 'Bilinmeyen hata'
          });
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      
      this.logger.info('Future statüsündeki ekstrelerin güncelleme işlemi tamamlandı', { 
        totalProcessed: futureStatements.length,
        successCount,
        errorCount: futureStatements.length - successCount
      });
      
      return {
        success: true,
        message: `${futureStatements.length} ekstre için işlem yapıldı, ${successCount} işlem başarılı`,
        details: results
      };
    } catch (error) {
      this.logger.error('Future statüsündeki ekstreleri güncelleme işlemi sırasında beklenmeyen hata', { error });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
