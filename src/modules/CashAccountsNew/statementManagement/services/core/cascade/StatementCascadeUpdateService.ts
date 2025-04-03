
/**
 * Ekstre zincirleme güncelleme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SingleStatementResponse } from '../../../types';
import { StatementQueryService } from '../query/StatementQueryService';
import { StatementUpdateService } from '../update/StatementUpdateService';

/**
 * Belirli bir ekstreden sonraki ekstrelerin bakiyelerini zincirleme olarak güncelleme servisi
 */
export class StatementCascadeUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementCascadeUpdateService');

  /**
   * Belirtilen ekstreden sonraki tüm ekstrelerin bakiyelerini günceller
   */
  static async updateSubsequentStatements(
    currentStatementId: string,
    accountId: string
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating subsequent statements', { 
        currentStatementId, 
        accountId 
      });
      
      // 1. Referans ekstreyi getir
      const currentStatementResult = await StatementQueryService.getStatementById(currentStatementId);
      
      if (!currentStatementResult.success || !currentStatementResult.data) {
        return currentStatementResult;
      }
      
      const currentStatement = currentStatementResult.data;
      
      // 2. Bu ekstreden sonraki tüm ekstreleri tarih sırasına göre getir (en eskiden en yeniye)
      const { data: subsequentStatements, error } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('account_id', accountId)
        .gt('start_date', currentStatement.end_date)
        .order('start_date', { ascending: true });
      
      if (error) {
        this.logger.error('Failed to get subsequent statements', { 
          currentStatementId, 
          accountId, 
          error 
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      if (!subsequentStatements || subsequentStatements.length === 0) {
        this.logger.info('No subsequent statements found', { 
          currentStatementId, 
          accountId 
        });
        return {
          success: true,
          data: currentStatement
        };
      }
      
      // 3. Her bir ekstreyi sırayla güncelleyelim
      this.logger.debug(`Found ${subsequentStatements.length} subsequent statements to update`);
      
      let previousEndBalance = currentStatement.end_balance;
      let updatedStatement = currentStatement;
      
      for (const statement of subsequentStatements) {
        // Önceki ekstrenin bitiş bakiyesini, bu ekstrenin başlangıç bakiyesi olarak kullan
        const startBalance = previousEndBalance;
        
        // Gelir ve giderleri getir
        const { data: transactions, error: txError } = await supabase
          .from('cash_account_transactions')
          .select('amount, transaction_type')
          .eq('statement_id', statement.id);
        
        if (txError) {
          this.logger.error('Failed to get transactions for subsequent statement', { 
            statementId: statement.id, 
            error: txError 
          });
          continue; // Hata olsa bile diğer ekstreleri güncellemeye devam et
        }
        
        // Gelir ve giderleri topla
        const totals = transactions.reduce(
          (acc, tx) => {
            if (tx.transaction_type === 'income') {
              acc.income += Number(tx.amount);
            } else if (tx.transaction_type === 'expense') {
              acc.expenses += Number(tx.amount);
            }
            return acc;
          },
          { income: 0, expenses: 0 }
        );
        
        // Bitiş bakiyesini hesapla
        const endBalance = Number(startBalance) + totals.income - totals.expenses;
        
        // Bakiyeleri güncelle
        const updateResult = await StatementUpdateService.updateStatementBalances(
          statement.id,
          totals.income,
          totals.expenses,
          endBalance
        );
        
        if (!updateResult.success) {
          this.logger.error('Failed to update subsequent statement', { 
            statementId: statement.id, 
            error: updateResult.error 
          });
          continue; // Hata olsa bile diğer ekstreleri güncellemeye devam et
        }
        
        // Bir sonraki ekstre için bitiş bakiyesini referans olarak kaydet
        previousEndBalance = endBalance;
        updatedStatement = updateResult.data!;
        
        this.logger.debug(`Updated subsequent statement ${statement.id}`, { 
          startBalance, 
          income: totals.income, 
          expenses: totals.expenses, 
          endBalance 
        });
      }
      
      return {
        success: true,
        data: updatedStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error updating subsequent statements', { 
        currentStatementId, 
        accountId, 
        error 
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
