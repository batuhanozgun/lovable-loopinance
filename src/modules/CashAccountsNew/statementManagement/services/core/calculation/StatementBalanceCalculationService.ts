
/**
 * Ekstre bakiyelerini hesaplayan servis
 * İşlemler eklendiğinde veya silindiğinde ekstre bakiyelerini günceller
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementUpdateService } from '../update/StatementUpdateService';
import { StatementCascadeUpdateService } from '../cascade/StatementCascadeUpdateService';
import { SingleStatementResponse } from '../../../types';

export class StatementBalanceCalculationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementBalanceCalculationService');

  /**
   * Belirli bir ekstrenin toplam gelir, gider ve kapanış bakiyesini hesaplar ve günceller
   * @param statementId Ekstre kimliği
   * @param accountId Hesap kimliği
   * @param performCascadeUpdate Sonraki ekstreleri de güncellesin mi
   * @returns İşlem sonucu
   */
  static async calculateAndUpdateStatementBalance(
    statementId: string,
    accountId: string,
    performCascadeUpdate: boolean = false
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Ekstre bakiyeleri hesaplanıyor', { statementId, accountId });
      
      // Ekstredeki tüm işlemleri getir
      const { data: transactions, error: transactionsError } = await supabase
        .from('cash_account_transactions')
        .select('amount, transaction_type')
        .eq('statement_id', statementId)
        .eq('account_id', accountId);
      
      if (transactionsError) {
        this.logger.error('İşlemler getirilirken hata oluştu', { 
          statementId,
          accountId,
          error: transactionsError 
        });
        return {
          success: false,
          error: transactionsError.message
        };
      }
      
      // Gelir ve giderleri hesapla
      let income = 0;
      let expenses = 0;
      
      transactions?.forEach(transaction => {
        // Burada veritabanından gelen işlem tiplerini kontrol ediyoruz
        // Veritabanında 'income' ve 'expense' olarak saklanıyor
        if (transaction.transaction_type.toLowerCase() === 'income') {
          income += Number(transaction.amount);
        } else if (transaction.transaction_type.toLowerCase() === 'expense') {
          expenses += Number(transaction.amount);
        }
      });
      
      // Ekstrenin başlangıç bakiyesini getir
      const { data: statement, error: statementError } = await supabase
        .from('cash_account_statements')
        .select('start_balance')
        .eq('id', statementId)
        .single();
      
      if (statementError) {
        this.logger.error('Ekstre bilgisi getirilirken hata oluştu', { 
          statementId,
          accountId,
          error: statementError 
        });
        return {
          success: false,
          error: statementError.message
        };
      }
      
      // Bitiş bakiyesini hesapla
      const startBalance = Number(statement.start_balance);
      const endBalance = startBalance + income - expenses;
      
      // Bakiye bilgilerini güncelle
      this.logger.info('Ekstre bakiyeleri hesaplandı ve güncelleniyor', {
        statementId,
        accountId,
        income,
        expenses,
        startBalance,
        endBalance
      });
      
      const result = await StatementUpdateService.updateStatementBalances(
        statementId,
        income,
        expenses,
        endBalance
      );
      
      // Eğer istenirse, zincirleme güncelleme yap
      if (performCascadeUpdate && result.success) {
        await StatementCascadeUpdateService.updateSubsequentStatements(
          statementId,
          accountId
        );
      }
      
      return result;
    } catch (error) {
      this.logger.error('Ekstre bakiyeleri hesaplanırken beklenmeyen hata', {
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
