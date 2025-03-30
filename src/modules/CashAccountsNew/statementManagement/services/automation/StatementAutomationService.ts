
/**
 * Ekstre otomasyonu için ana servis
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { supabase } from '@/integrations/supabase/client';
import { FutureStatementService } from './FutureStatementService';
import { StatementService } from '../StatementService';
import { CashAccount } from '../../../cashAccountHomepage/types';
import { toast } from 'sonner';
import { i18n } from '@/i18n/config';

/**
 * Ekstre otomasyonu için ana servis
 */
export class StatementAutomationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementAutomationService');

  /**
   * Edge function aracılığıyla tüm ekstreleri kontrol eder
   * Bu işlem mevcut ekstreleri kapatıp yeni açık ve yeni gelecek ekstreler oluşturur
   */
  static async processAllStatements(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      this.logger.debug('Tüm ekstreleri işleme başlatılıyor');
      
      // Edge function çağrısı
      const { data, error } = await supabase.functions.invoke('statement-process', {
        method: 'POST',
        body: { source: 'client' }
      });
      
      if (error) {
        this.logger.error('Ekstre işleme fonksiyonu çağrılırken hata', { error });
        return { 
          success: false, 
          message: error.message 
        };
      }
      
      this.logger.info('Ekstre işleme tamamlandı', { result: data });
      
      // Eksik future statementları kontrol et ve oluştur
      if (data.accounts_needing_future && data.accounts_needing_future.length > 0) {
        for (const accountStatus of data.accounts_needing_future) {
          await FutureStatementService.checkAndCreateMissingFutureStatements(accountStatus.account_id);
        }
      }
      
      return { 
        success: true, 
        message: i18n.t('CashAccountsNew:statements.toasts.statementCheckComplete')
      };
    } catch (error) {
      this.logger.error('Ekstre işleme sırasında beklenmeyen hata', { error });
      return { 
        success: false, 
        message: error instanceof Error ? error.message : i18n.t('CashAccountsNew:statements.toasts.statementCheckError')
      };
    }
  }

  /**
   * Belirli bir hesap için ekstre işlemleri yapar
   * Gelecek ekstreleri kontrol eder ve eksikse oluşturur
   */
  static async processAccountStatements(account: CashAccount): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      this.logger.debug('Hesap ekstreleri işleme başlatılıyor', { accountId: account.id });
      
      // Hesabın future statement ihtiyacını kontrol et
      const result = await FutureStatementService.checkAndCreateMissingFutureStatements(account.id);
      
      if (!result.success) {
        this.logger.error('Hesap için future statement kontrol hatası', { 
          accountId: account.id, 
          error: result.error 
        });
        return { 
          success: false, 
          message: result.error || i18n.t('CashAccountsNew:statements.toasts.statementCheckError')
        };
      }
      
      // Herhangi bir yeni future statement oluşturulduysa başarılı mesajı göster
      if (result.createdCount > 0) {
        this.logger.info('Hesap için future statementlar oluşturuldu', { 
          accountId: account.id, 
          count: result.createdCount 
        });
        return { 
          success: true, 
          message: i18n.t('CashAccountsNew:statements.toasts.futureStatementsCreated', { count: result.createdCount })
        };
      }
      
      return { 
        success: true, 
        message: i18n.t('CashAccountsNew:statements.toasts.statementCheckComplete')
      };
    } catch (error) {
      this.logger.error('Hesap ekstreleri işleme sırasında beklenmeyen hata', { 
        error,
        accountId: account.id 
      });
      return { 
        success: false, 
        message: error instanceof Error ? error.message : i18n.t('CashAccountsNew:statements.toasts.statementCheckError')
      };
    }
  }

  /**
   * Edge function aracılığıyla hesap ekstre kontrolü
   * Bu API özellikle front-end'den çağrılmak üzere tasarlanmıştır
   */
  static async checkAccountStatements(accountId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      this.logger.debug('Hesap için ekstre kontrolü başlatılıyor', { accountId });
      
      // Edge function çağrısı
      const { data, error } = await supabase.functions.invoke('statement-check', {
        method: 'POST',
        body: { accountId }
      });
      
      if (error) {
        this.logger.error('Ekstre kontrol fonksiyonu çağrılırken hata', { accountId, error });
        return { 
          success: false, 
          message: error.message 
        };
      }
      
      this.logger.info('Hesap için ekstre kontrolü tamamlandı', { accountId, result: data });
      
      return { 
        success: true, 
        message: i18n.t('CashAccountsNew:statements.toasts.statementCheckComplete')
      };
    } catch (error) {
      this.logger.error('Hesap ekstre kontrolü sırasında beklenmeyen hata', { accountId, error });
      return { 
        success: false, 
        message: error instanceof Error ? error.message : i18n.t('CashAccountsNew:statements.toasts.statementCheckError')
      };
    }
  }
}
