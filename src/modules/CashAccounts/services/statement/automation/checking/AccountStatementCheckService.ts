
/**
 * Tüm hesaplar için ekstre kontrol servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { CashAccount } from '../../../../types';
import { BatchStatementProcessResult } from '../../shared/types';
import { SingleAccountStatementService } from './SingleAccountStatementService';

export class AccountStatementCheckService {
  private logger: ILogger;
  private singleAccountService: SingleAccountStatementService;

  constructor(
    logger: ILogger = serviceLogger,
    singleAccountService?: SingleAccountStatementService
  ) {
    this.logger = logger;
    this.singleAccountService = singleAccountService || new SingleAccountStatementService(logger);
  }

  /**
   * Tüm aktif hesaplar için dönem kontrol ve ekstre yaratma
   */
  async checkAndCreateStatementsForAllAccounts(): Promise<BatchStatementProcessResult> {
    try {
      this.logger.debug('Tüm hesaplar için ekstre kontrol işlemi başlatıldı');
      
      // Tüm aktif hesapları getir
      const { data: accounts, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('is_active', true);
      
      if (error) {
        this.logger.error('Hesapları getirirken hata oluştu', { error });
        return { 
          success: false, 
          message: 'Hesapları getirirken hata oluştu: ' + error.message 
        };
      }
      
      if (!accounts || accounts.length === 0) {
        this.logger.info('İşlem yapılacak aktif hesap bulunamadı');
        return { 
          success: true, 
          message: 'İşlem yapılacak aktif hesap bulunamadı' 
        };
      }
      
      const results = [];
      
      // Her hesap için dönem kontrol ve ekstre yaratma işlemi
      for (const account of accounts) {
        try {
          const result = await this.singleAccountService.checkAndCreateStatementForAccount(account);
          results.push({
            accountId: account.id,
            accountName: account.name,
            ...result
          });
        } catch (accountError) {
          this.logger.error('Hesap için ekstre kontrolü sırasında hata', { 
            accountId: account.id, 
            error: accountError 
          });
          
          results.push({
            accountId: account.id,
            accountName: account.name,
            success: false,
            message: accountError instanceof Error ? accountError.message : 'Bilinmeyen hata'
          });
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      
      this.logger.info('Tüm hesaplar için ekstre kontrol işlemi tamamlandı', { 
        totalAccounts: accounts.length,
        successCount,
        errorCount: accounts.length - successCount
      });
      
      return {
        success: true,
        message: `${accounts.length} hesap kontrol edildi, ${successCount} hesap için işlem başarılı`,
        totalAccounts: accounts.length,
        successCount,
        errorCount: accounts.length - successCount,
        details: results
      };
    } catch (error) {
      this.logger.error('Tüm hesaplar için ekstre kontrol işlemi sırasında beklenmeyen hata', { error });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
