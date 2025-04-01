
/**
 * Ekstre bakiye hesaplamaları için merkezi servis
 * Bu servis tüm bakiye hesaplama ve güncelleme işlemlerini yönetir
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  SingleStatementResponse 
} from '../../../types';
import { StatementQueryService } from '../query/StatementQueryService';
import { StatementUpdateService } from '../update/StatementUpdateService';

/**
 * Ekstre bakiye hesaplama ve güncelleme servisi
 */
export class StatementBalanceCalculationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementBalanceCalculationService');

  /**
   * Bir ekstreyi belirtilen bakiye değişimine göre günceller
   * @param statementId Güncellenecek ekstre ID
   * @param balanceChange Bakiye değişim miktarı (+ gelir, - gider)
   * @returns Güncellenmiş ekstre yanıtı
   */
  static async updateStatementBalance(
    statementId: string,
    balanceChange: number
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating statement balance', { statementId, balanceChange });
      
      // Mevcut ekstre bilgilerini getir
      const statementResponse = await StatementQueryService.getStatementById(statementId);
      
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Failed to fetch statement for balance update', { 
          statementId, 
          error: statementResponse.error 
        });
        return {
          success: false,
          error: statementResponse.error || 'Statement not found'
        };
      }
      
      const statement = statementResponse.data;
      
      // Yeni bakiyeleri hesapla
      let newIncome = Number(statement.income);
      let newExpenses = Number(statement.expenses);
      let newEndBalance = Number(statement.end_balance);
      
      // Bakiye değişimine göre gelir veya gider güncelle
      if (balanceChange > 0) {
        // Gelir artışı
        newIncome += balanceChange;
      } else if (balanceChange < 0) {
        // Gider artışı (balanceChange zaten negatif)
        newExpenses -= balanceChange; // Gider pozitif değer olarak saklanır
      }
      
      // Yeni bitiş bakiyesini hesapla
      newEndBalance += balanceChange;
      
      // Güncellemeyi yap
      const updateResult = await StatementUpdateService.updateStatementBalances(
        statementId,
        newIncome,
        newExpenses,
        newEndBalance
      );
      
      if (!updateResult.success) {
        this.logger.error('Failed to update statement balance', { 
          statementId, 
          error: updateResult.error 
        });
        return updateResult;
      }
      
      this.logger.info('Statement balance updated successfully', { 
        statementId,
        incomeChange: balanceChange > 0 ? balanceChange : 0,
        expenseChange: balanceChange < 0 ? Math.abs(balanceChange) : 0,
        newEndBalance
      });
      
      return updateResult;
    } catch (error) {
      this.logger.error('Unexpected error updating statement balance', { 
        statementId, 
        balanceChange,
        error 
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Ekstre zincirindeki tüm ekstreleri günceller (atomik işlem)
   * @param accountId Hesap ID
   * @param startStatementId Başlangıç ekstre ID
   * @param balanceChange Bakiye değişim miktarı
   * @returns İşlem başarı durumu
   */
  static async updateStatementChain(
    accountId: string,
    startStatementId: string,
    balanceChange: number
  ): Promise<boolean> {
    try {
      this.logger.debug('Starting atomic chain update for statements', { 
        accountId, 
        startStatementId, 
        balanceChange 
      });

      // Tüm ekstreleri tarihe göre sıralı olarak getir
      const statementsResponse = await StatementQueryService.getStatementsByAccountId(accountId);
      
      if (!statementsResponse.success || !statementsResponse.data) {
        this.logger.error('Failed to fetch statements for chain update', { 
          error: statementsResponse.error, 
          accountId 
        });
        return false;
      }

      // Tarihe göre sırala
      const allStatements = statementsResponse.data.sort((a, b) => {
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      });

      // Başlangıç ekstresinden sonraki ekstreleri bul
      const startStatementIndex = allStatements.findIndex(s => s.id === startStatementId);
      
      if (startStatementIndex === -1) {
        this.logger.error('Start statement not found in statements list', { startStatementId });
        return false;
      }

      // Etkilenen tüm ekstreler (başlangıç ekstresi dahil)
      const affectedStatements = allStatements.slice(startStatementIndex);
      
      this.logger.info('Found statements to update in chain', { 
        count: affectedStatements.length,
        statementIds: affectedStatements.map(s => s.id)
      });
      
      // Atomik işlem için begin transaction
      // İşlem atomik olduğu için her ekstre tek tek güncellenir, 
      // her biri için ayrı servis çağrısı yapılmaz.
      const { error: txnError } = await supabase.rpc('begin_transaction');
      if (txnError) {
        this.logger.error('Failed to begin transaction for chain update', { error: txnError });
        return false;
      }
      
      try {
        // Her ekstrenin bakiyesini güncelle
        for (let i = 0; i < affectedStatements.length; i++) {
          const currentStatement = affectedStatements[i];
          
          if (i === 0) {
            // İlk ekstre (işlemin eklendiği ekstre)
            // Bakiye değişimini hesapla ve güncelle
            const newEndBalance = Number(currentStatement.end_balance) + balanceChange;
            
            // Gelir veya gider güncelleme
            let newIncome = Number(currentStatement.income);
            let newExpenses = Number(currentStatement.expenses);
            
            if (balanceChange > 0) {
              newIncome += balanceChange;
            } else if (balanceChange < 0) {
              newExpenses -= balanceChange; // Gider pozitif değer olarak saklanır
            }
            
            // İlk ekstrenin güncellenmesi
            const { data: updatedStatement, error: updateError } = await supabase
              .from('account_statements')
              .update({ 
                income: newIncome,
                expenses: newExpenses,
                end_balance: newEndBalance 
              })
              .eq('id', currentStatement.id)
              .select();
            
            if (updateError) {
              throw new Error(`Failed to update start statement: ${updateError.message}`);
            }
            
            this.logger.debug('Updated start statement in transaction', { 
              statementId: currentStatement.id,
              newIncome,
              newExpenses,
              newEndBalance
            });
          } 
          else {
            // Sonraki ekstreler
            const previousStatement = affectedStatements[i - 1];
            
            // Bu ekstrenin başlangıç bakiyesi, önceki ekstrenin bitiş bakiyesi olmalı
            const newStartBalance = Number(previousStatement.end_balance);
            
            // Bitiş bakiyesi, başlangıç bakiyesine göre yeniden hesaplanır
            // Bitiş bakiyesi = Başlangıç bakiyesi + (Gelir - Gider)
            const newEndBalance = newStartBalance + (Number(currentStatement.income) - Number(currentStatement.expenses));
            
            // Ekstre güncelleme
            const { data: updatedStatement, error: updateError } = await supabase
              .from('account_statements')
              .update({ 
                start_balance: newStartBalance, 
                end_balance: newEndBalance 
              })
              .eq('id', currentStatement.id)
              .select();
            
            if (updateError) {
              throw new Error(`Failed to update subsequent statement: ${updateError.message}`);
            }
            
            this.logger.debug('Updated subsequent statement in transaction', { 
              statementId: currentStatement.id,
              newStartBalance,
              newEndBalance
            });
          }
        }
        
        // İşlemi kaydet (commit)
        const { error: commitError } = await supabase.rpc('commit_transaction');
        if (commitError) {
          this.logger.error('Failed to commit transaction for chain update', { error: commitError });
          return false;
        }
        
        this.logger.info('Successfully completed atomic statement chain update', { 
          accountId, 
          startStatementId,
          affectedStatementsCount: affectedStatements.length
        });
        
        return true;
      } catch (chainError) {
        // Hata durumunda işlemi geri al (rollback)
        const { error: rollbackError } = await supabase.rpc('rollback_transaction');
        if (rollbackError) {
          this.logger.error('Failed to rollback transaction after chain update error', { error: rollbackError });
        }
        
        this.logger.error('Error during statement chain update, transaction rolled back', { 
          accountId, 
          startStatementId, 
          error: chainError 
        });
        
        return false;
      }
    } catch (error) {
      this.logger.error('Unexpected error updating statement chain', { 
        accountId, 
        startStatementId, 
        error 
      });
      return false;
    }
  }

  /**
   * Belirli bir tarih aralığındaki işlemlerin toplam gelir ve giderlerini hesaplar
   * @param accountId Hesap ID
   * @param startDate Başlangıç tarihi
   * @param endDate Bitiş tarihi
   * @returns {Promise<{income: number, expenses: number, net: number}>} Toplam gelir, gider ve net değişim
   */
  static async calculateTransactionTotals(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<{ income: number, expenses: number, net: number }> {
    try {
      this.logger.debug('Calculating transaction totals for period', { 
        accountId, 
        startDate, 
        endDate 
      });
      
      // Gelir işlemleri toplamını getir
      const { data: incomeData, error: incomeError } = await supabase
        .from('account_transactions')
        .select('amount')
        .eq('account_id', accountId)
        .eq('transaction_type', 'income')
        .gte('transaction_date', startDate)
        .lte('transaction_date', endDate)
        .select('sum(amount)');
      
      if (incomeError) {
        this.logger.error('Failed to calculate income total', { 
          accountId, 
          startDate, 
          endDate, 
          error: incomeError 
        });
        throw new Error(`Failed to calculate income: ${incomeError.message}`);
      }
      
      // Gider işlemleri toplamını getir
      const { data: expenseData, error: expenseError } = await supabase
        .from('account_transactions')
        .select('amount')
        .eq('account_id', accountId)
        .eq('transaction_type', 'expense')
        .gte('transaction_date', startDate)
        .lte('transaction_date', endDate)
        .select('sum(amount)');
      
      if (expenseError) {
        this.logger.error('Failed to calculate expense total', { 
          accountId, 
          startDate, 
          endDate, 
          error: expenseError 
        });
        throw new Error(`Failed to calculate expenses: ${expenseError.message}`);
      }
      
      // Sonuçları hazırla
      const income = Number(incomeData?.[0]?.sum || 0);
      const expenses = Number(expenseData?.[0]?.sum || 0);
      const net = income - expenses;
      
      this.logger.info('Transaction totals calculated successfully', { 
        accountId, 
        startDate, 
        endDate, 
        income, 
        expenses, 
        net 
      });
      
      return { income, expenses, net };
    } catch (error) {
      this.logger.error('Unexpected error calculating transaction totals', { 
        accountId, 
        startDate, 
        endDate, 
        error 
      });
      throw error;
    }
  }
}
