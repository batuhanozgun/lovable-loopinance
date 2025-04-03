
/**
 * Ekstre zincirleme güncelleme servisi
 * Bir ekstrenin bakiyesindeki değişikliğin sonraki ekstrelere zincirleme olarak yansımasını sağlar
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementBalanceCalculationService } from '../calculation/StatementBalanceCalculationService';
import { StatementUpdateService } from '../update/StatementUpdateService';
import { SingleStatementResponse, AccountStatement } from '../../../types';

export class StatementCascadeUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementCascadeUpdateService');

  /**
   * Belirli bir ekstreden sonraki tüm ekstreleri zincirleme olarak günceller
   * @param statementId Başlangıç ekstre ID'si
   * @param accountId Hesap ID'si
   * @returns İşlem sonucu
   */
  static async updateSubsequentStatements(
    statementId: string,
    accountId: string
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Zincirleme ekstre güncellemesi başlatılıyor', { statementId, accountId });
      
      // Önce değişiklik yapılan ekstrenin güncel bilgilerini alalım
      const { data: currentStatement, error: currentError } = await supabase
        .from('cash_account_statements')
        .select('id, end_date, end_balance')
        .eq('id', statementId)
        .single();
      
      if (currentError || !currentStatement) {
        this.logger.error('Mevcut ekstre bilgileri alınamadı', { statementId, error: currentError });
        return {
          success: false,
          error: currentError?.message || 'Ekstre bulunamadı'
        };
      }
      
      // Sonraki ekstreleri tarih sırasına göre getirelim
      const { data: subsequentStatements, error: subError } = await supabase
        .from('cash_account_statements')
        .select('id, start_date, end_date, start_balance, end_balance')
        .eq('account_id', accountId)
        .gt('start_date', currentStatement.end_date) // Mevcut ekstrenin bitiş tarihinden sonraki ekstreler
        .order('start_date', { ascending: true });
      
      if (subError) {
        this.logger.error('Sonraki ekstreler alınamadı', { accountId, error: subError });
        return {
          success: false,
          error: subError.message
        };
      }
      
      // Sonraki ekstre yoksa işlem tamamlandı
      if (!subsequentStatements || subsequentStatements.length === 0) {
        this.logger.info('Güncellenecek sonraki ekstre bulunmadı', { statementId, accountId });
        return {
          success: true,
          data: null
        };
      }
      
      this.logger.info('Sonraki ekstreler güncelleniyor', { 
        count: subsequentStatements.length,
        statements: subsequentStatements.map(s => s.id)
      });
      
      // Önceki ekstrenin kapanış bakiyesi
      let previousEndBalance = currentStatement.end_balance;
      
      // Her bir sonraki ekstre için zincirleme güncelleme yapalım
      for (const statement of subsequentStatements) {
        // Başlangıç bakiyesini önceki ekstrenin kapanış bakiyesine eşitleyelim
        if (statement.start_balance !== previousEndBalance) {
          // Ekstre başlangıç bakiyesini güncelle
          const { data: updatedStatement, error: updateError } = await supabase
            .from('cash_account_statements')
            .update({ 
              start_balance: previousEndBalance,
              // Bitiş bakiyesini de ön hesaplama olarak güncelleyelim
              // Bu sonraki adımda daha doğru bir şekilde hesaplanacak
              end_balance: previousEndBalance + (statement.end_balance - statement.start_balance)
            })
            .eq('id', statement.id)
            .select()
            .single();
          
          if (updateError) {
            this.logger.error('Ekstre başlangıç bakiyesi güncellenirken hata oluştu', { 
              statementId: statement.id, 
              error: updateError 
            });
            continue; // Hataya rağmen diğer ekstreleri güncellemeye devam edelim
          }
        }
        
        // Ekstrenin gerçek gelir/gider bakiyelerini yeniden hesaplayalım
        await StatementBalanceCalculationService.calculateAndUpdateStatementBalance(
          statement.id,
          accountId
        );
        
        // Güncellenmiş ekstrenin yeni kapanış bakiyesini alalım (sonraki ekstre için kullanılacak)
        const { data: refreshedStatement, error: refreshError } = await supabase
          .from('cash_account_statements')
          .select('end_balance')
          .eq('id', statement.id)
          .single();
        
        if (refreshError || !refreshedStatement) {
          this.logger.error('Güncellenmiş ekstre bilgileri alınamadı', { 
            statementId: statement.id, 
            error: refreshError 
          });
          continue;
        }
        
        // Bir sonraki ekstre için önceki kapanış bakiyesini güncelleyelim
        previousEndBalance = refreshedStatement.end_balance;
      }
      
      this.logger.info('Zincirleme ekstre güncellemesi tamamlandı', { 
        statementId,
        accountId,
        updatedCount: subsequentStatements.length
      });
      
      return {
        success: true,
        data: null
      };
    } catch (error) {
      this.logger.error('Zincirleme ekstre güncellemesi sırasında beklenmeyen hata', {
        statementId,
        accountId,
        error
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
