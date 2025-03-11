
/**
 * Ekstre kapatma ve yeni dönem başlatma servisi
 */
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { AccountStatement, StatementStatus } from '../../../../types';
import { StatementUpdateService } from '../../core/update/StatementUpdateService';
import { StatementCreationService } from '../../core/creation/StatementCreationService';
import { StatementPeriodService } from '../../core/period/StatementPeriodService';
import { StatementPeriodCheckService } from '../checking/StatementPeriodCheckService';
import { SingleAccountStatementService } from '../checking/SingleAccountStatementService';
import { StatementStatusManagerService } from './StatementStatusManagerService';

export class StatementClosingService {
  private logger: ILogger;
  private updateService: typeof StatementUpdateService;
  private singleAccountService: SingleAccountStatementService;
  private periodCheckService: StatementPeriodCheckService;
  private periodService: typeof StatementPeriodService;
  private creationService: typeof StatementCreationService;
  private statusManagerService: StatementStatusManagerService;

  constructor(
    logger: ILogger = serviceLogger,
    updateService: typeof StatementUpdateService = StatementUpdateService,
    periodService: typeof StatementPeriodService = StatementPeriodService,
    creationService: typeof StatementCreationService = StatementCreationService,
    singleAccountService?: SingleAccountStatementService,
    periodCheckService?: StatementPeriodCheckService,
    statusManagerService?: StatementStatusManagerService
  ) {
    this.logger = logger;
    this.updateService = updateService;
    this.periodService = periodService;
    this.creationService = creationService;
    this.periodCheckService = periodCheckService || new StatementPeriodCheckService(logger, periodService);
    this.statusManagerService = statusManagerService || new StatementStatusManagerService(logger, updateService);
    this.singleAccountService = singleAccountService || new SingleAccountStatementService(
      logger, 
      periodService, 
      creationService, 
      updateService,
      this.periodCheckService,
      this.statusManagerService
    );
  }

  /**
   * Dönem sonu gelmiş ekstreleri kapat ve yeni dönem için ekstre oluştur
   */
  async closeExpiredStatementsAndCreateNew() {
    try {
      this.logger.debug('Dönem sonu gelmiş ekstreleri kapatma işlemi başlatıldı');
      
      // Bugünün tarihini al
      const today = new Date();
      const todayStr = format(today, 'yyyy-MM-dd');
      
      // Bitiş tarihi geçmiş açık ekstreleri bul
      const { data: expiredStatements, error } = await supabase
        .from('account_statements')
        .select('*, cash_accounts(*)')
        .eq('status', 'open')
        .lt('end_date', todayStr);
      
      if (error) {
        this.logger.error('Süresi geçmiş ekstreleri bulurken hata', { error });
        return { 
          success: false, 
          message: 'Süresi geçmiş ekstreleri bulurken hata: ' + error.message 
        };
      }
      
      if (!expiredStatements || expiredStatements.length === 0) {
        this.logger.info('Kapatılacak süresi geçmiş ekstre bulunamadı');
        return { 
          success: true, 
          message: 'Kapatılacak süresi geçmiş ekstre bulunamadı' 
        };
      }
      
      const results = [];
      
      // Her bir süresi geçmiş ekstre için
      for (const statement of expiredStatements) {
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
            
            results.push({
              statementId: statement.id,
              accountId: statement.account_id,
              action: 'close',
              success: false,
              message: closeResult.error
            });
            
            continue;
          }
          
          // Başarılı kapatma bilgisi ekle
          results.push({
            statementId: statement.id,
            accountId: statement.account_id,
            action: 'close',
            success: true,
            message: 'Ekstre başarıyla kapatıldı'
          });
          
          // Yeni dönem için ekstre oluştur
          const account = statement.cash_accounts;
          if (!account) {
            this.logger.error('Ekstre için hesap bilgisi bulunamadı', { 
              statementId: statement.id, 
              accountId: statement.account_id 
            });
            
            results.push({
              statementId: statement.id,
              accountId: statement.account_id,
              action: 'create_new',
              success: false,
              message: 'Ekstre için hesap bilgisi bulunamadı'
            });
            
            continue;
          }
          
          // Bir sonraki ay için ekstre oluştur
          const nextMonthResult = await this.periodCheckService.checkNextMonthPeriod(account, today);
          
          if (!nextMonthResult.exists && nextMonthResult.period) {
            const createResult = await this.creationService.createNextStatement(
              account.id,
              nextMonthResult.period.startDate,
              nextMonthResult.period.endDate,
              statement as AccountStatement
            );
            
            if (!createResult.success) {
              this.logger.error('Sonraki dönem ekstresi oluşturulurken hata', { 
                accountId: account.id, 
                error: createResult.error 
              });
              
              results.push({
                accountId: account.id,
                action: 'create_next_period',
                success: false,
                message: 'Sonraki dönem ekstresi oluşturulurken hata: ' + createResult.error
              });
              
              continue;
            }
            
            // Future statüsü ata
            await this.statusManagerService.updateStatementStatusBasedOnDate(
              createResult.data!.id, 
              nextMonthResult.period.startDate, 
              today
            );
            
            results.push({
              accountId: account.id,
              action: 'create_next_period',
              success: true,
              message: 'Sonraki dönem ekstresi oluşturuldu',
              newStatementId: createResult.data?.id
            });
          } else if (nextMonthResult.exists && nextMonthResult.statement) {
            results.push({
              accountId: account.id,
              action: 'check_next_period',
              success: true,
              message: 'Sonraki dönem ekstresi zaten mevcut',
              existingStatementId: nextMonthResult.statement.id
            });
          }
          
          // Hesap için mevcut dönem ekstresini kontrol et
          const createResult = await this.singleAccountService.checkAndCreateStatementForAccount(account);
          
          results.push({
            accountId: account.id,
            action: 'create_new',
            success: createResult.success,
            message: createResult.message,
            newStatementId: createResult.statementId
          });
        } catch (statementError) {
          this.logger.error('Ekstre işlemleri sırasında hata', { 
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
      
      this.logger.info('Dönem sonu gelmiş ekstrelerin kapatılma işlemi tamamlandı', { 
        totalProcessed: expiredStatements.length * 2, // Kapatma ve yeni oluşturma
        successCount,
        errorCount: (expiredStatements.length * 2) - successCount
      });
      
      return {
        success: true,
        message: `${expiredStatements.length} ekstre için işlem yapıldı, ${successCount} işlem başarılı`,
        details: results
      };
    } catch (error) {
      this.logger.error('Ekstreleri kapatma işlemi sırasında beklenmeyen hata', { error });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
