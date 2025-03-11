
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, StatementStatus } from '../../types';
import { serviceLogger } from '../../logging';
import { StatementPeriodService } from './StatementPeriodService';
import { StatementCreationService } from './StatementCreationService';
import { StatementUpdateService } from './StatementUpdateService';
import { format } from 'date-fns';

/**
 * Otomatik ekstre oluşturma ve yönetme servisi
 */
export class StatementAutoCreationService {
  private static logger = serviceLogger;

  /**
   * Tüm aktif hesaplar için dönem kontrol ve ekstre yaratma
   */
  static async checkAndCreateStatementsForAllAccounts() {
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
          const result = await this.checkAndCreateStatementForAccount(account);
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

  /**
   * Bir hesap için dönem kontrolü ve ekstre yaratma
   */
  static async checkAndCreateStatementForAccount(account: CashAccount) {
    try {
      this.logger.debug('Hesap için ekstre kontrol işlemi başlatıldı', { accountId: account.id });
      
      // Mevcut tarihi al
      const now = new Date();
      
      // Hesap için mevcut dönemi hesapla
      const currentPeriod = StatementPeriodService.calculateCurrentPeriod(account, now);
      
      // Mevcut dönem için ekstre var mı kontrol et
      const { data: existingStatements, error: queryError } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', account.id)
        .gte('start_date', format(currentPeriod.startDate, 'yyyy-MM-dd'))
        .lte('end_date', format(currentPeriod.endDate, 'yyyy-MM-dd'))
        .order('created_at', { ascending: false });
      
      if (queryError) {
        this.logger.error('Mevcut ekstreleri kontrol ederken hata', { 
          accountId: account.id, 
          error: queryError 
        });
        return { 
          success: false, 
          message: 'Mevcut ekstreleri kontrol ederken hata: ' + queryError.message 
        };
      }
      
      // Eğer mevcut dönem için ekstre yoksa, yeni ekstre oluştur
      if (!existingStatements || existingStatements.length === 0) {
        // En son ekstre var mı diye kontrol et
        const { data: lastStatement, error: lastStatementError } = await supabase
          .from('account_statements')
          .select('*')
          .eq('account_id', account.id)
          .order('end_date', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (lastStatementError) {
          this.logger.error('Son ekstre kontrolünde hata', { 
            accountId: account.id, 
            error: lastStatementError 
          });
          return { 
            success: false, 
            message: 'Son ekstre kontrolünde hata: ' + lastStatementError.message 
          };
        }
        
        // Ekstre oluştur
        const result = await StatementCreationService.createNextStatement(
          account.id,
          currentPeriod.startDate,
          currentPeriod.endDate,
          lastStatement
        );
        
        if (!result.success) {
          this.logger.error('Yeni ekstre oluşturulurken hata', { 
            accountId: account.id, 
            error: result.error 
          });
          return { 
            success: false, 
            message: 'Yeni ekstre oluşturulurken hata: ' + result.error 
          };
        }
        
        this.logger.info('Hesap için yeni ekstre oluşturuldu', { 
          accountId: account.id, 
          statementId: result.data?.id,
          period: `${format(currentPeriod.startDate, 'yyyy-MM-dd')} - ${format(currentPeriod.endDate, 'yyyy-MM-dd')}`
        });
        
        return { 
          success: true, 
          message: 'Yeni ekstre oluşturuldu', 
          statementId: result.data?.id 
        };
      }
      
      this.logger.info('Hesap için mevcut dönemde ekstre bulundu', { 
        accountId: account.id, 
        statementId: existingStatements[0].id,
        period: `${existingStatements[0].start_date} - ${existingStatements[0].end_date}`
      });
      
      return { 
        success: true, 
        message: 'Mevcut dönem için ekstre zaten var', 
        statementId: existingStatements[0].id 
      };
    } catch (error) {
      this.logger.error('Hesap için ekstre kontrolü sırasında beklenmeyen hata', { 
        accountId: account.id, 
        error 
      });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }

  /**
   * Dönem sonu gelmiş ekstreleri kapat ve yeni dönem için ekstre oluştur
   */
  static async closeExpiredStatementsAndCreateNew() {
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
          const closeResult = await StatementUpdateService.updateStatementStatus(
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
          
          // Hesap için yeni ekstre oluştur
          const createResult = await this.checkAndCreateStatementForAccount(account);
          
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
