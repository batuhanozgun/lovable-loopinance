
/**
 * Ekstre bakiye hesaplama servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SingleStatementResponse } from '../../../types';
import { StatementUpdateService } from '../update/StatementUpdateService';
import { StatementCascadeUpdateService } from '../cascade/StatementCascadeUpdateService';
import { StatementQueryService } from '../query/StatementQueryService';

/**
 * Ekstre bakiye hesaplama servisi
 */
export class StatementBalanceCalculationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementBalanceCalculationService');

  /**
   * Belirtilen ekstrenin gelir, gider ve bakiyelerini yeniden hesaplar
   */
  static async calculateAndUpdateStatementBalance(
    statementId: string,
    accountId: string,
    cascadeUpdate: boolean = true
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Calculating statement balance', { 
        statementId, 
        accountId,
        cascadeUpdate 
      });
      
      // 1. Ekstredeki tüm işlemleri getir
      const { data: transactions, error } = await supabase
        .from('cash_account_transactions')
        .select('amount, transaction_type')
        .eq('statement_id', statementId);
      
      if (error) {
        this.logger.error('Failed to get transactions for statement', { 
          statementId, 
          error 
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      // 2. İlgili statementı getir (başlangıç bakiyesini almak için)
      const statementResult = await StatementQueryService.getStatementById(statementId);
      
      if (!statementResult.success || !statementResult.data) {
        this.logger.error('Failed to get statement for balance calculation', { 
          statementId, 
          error: statementResult.error 
        });
        return statementResult;
      }
      
      const statement = statementResult.data;
      
      // 3. Gelir ve giderleri topla
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
      
      // 4. Bitiş bakiyesini hesapla
      const endBalance = Number(statement.start_balance) + totals.income - totals.expenses;
      
      // 5. Bakiyeleri güncelle
      const updateResult = await StatementUpdateService.updateStatementBalances(
        statementId,
        totals.income,
        totals.expenses,
        endBalance
      );
      
      if (!updateResult.success) {
        this.logger.error('Failed to update statement balances', { 
          statementId, 
          error: updateResult.error 
        });
        return updateResult;
      }
      
      this.logger.info('Statement balances calculated and updated', { 
        statementId,
        income: totals.income,
        expenses: totals.expenses,
        endBalance
      });
      
      // 6. Eğer istenirse, bu ekstreden sonraki ekstreleri de güncelle
      if (cascadeUpdate) {
        try {
          const cascadeResult = await StatementCascadeUpdateService.updateSubsequentStatements(
            statementId,
            accountId
          );
          
          if (!cascadeResult.success) {
            this.logger.warn('Failed to update subsequent statements', { 
              statementId, 
              error: cascadeResult.error 
            });
            // Ana işlem hala başarılı kabul edilecek, ancak log oluşturacak
          }
        } catch (cascadeError) {
          // Zincirleme güncelleme hatası ana işlemin başarısını etkilememeli
          this.logger.error('Error during cascade update', { 
            statementId, 
            error: cascadeError 
          });
        }
      }
      
      return updateResult;
    } catch (error) {
      this.logger.error('Unexpected error calculating statement balance', { 
        statementId, 
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
