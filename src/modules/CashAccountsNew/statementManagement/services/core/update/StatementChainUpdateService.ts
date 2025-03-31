
/**
 * Zincirleme ekstre güncellemeleri için servis
 * Bir işlem eklendiğinde/silindiğinde/güncellendiğinde, bu işlemle ilişkili ekstreden sonraki tüm ekstreleri günceller
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { AccountStatement, StatementStatus } from '../../../types';
import { StatementQueryService } from '../query/StatementQueryService';
import { StatementUpdateService } from './StatementUpdateService';

/**
 * Zincirleme ekstre güncellemeleri için servis
 */
export class StatementChainUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementChainUpdateService');

  /**
   * Bir ekstreden başlayarak tüm sonraki ekstreleri günceller
   * @param accountId Hesap ID
   * @param startStatementId Başlangıç ekstresi ID
   * @param balanceChange Bakiye değişim miktarı (+ gelir, - gider)
   */
  static async updateStatementChain(
    accountId: string,
    startStatementId: string,
    balanceChange: number
  ): Promise<boolean> {
    try {
      this.logger.debug('Starting chain update for statements', { 
        accountId, 
        startStatementId, 
        balanceChange 
      });

      // İlk olarak güncellenecek ekstreyi getir
      const { data: statement, error: statementError } = await supabase
        .from('account_statements')
        .select('*')
        .eq('id', startStatementId)
        .single();

      if (statementError || !statement) {
        this.logger.error('Failed to fetch start statement for chain update', { 
          error: statementError, 
          startStatementId 
        });
        return false;
      }

      // Bu noktadan sonraki tüm ekstreleri getir (start_date'e göre sıralı)
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

      // Her ekstrenin bakiyesini güncelle
      for (let i = 0; i < affectedStatements.length; i++) {
        const currentStatement = affectedStatements[i];
        
        // İlk ekstre (güncellenen işlemin olduğu ekstre)
        if (i === 0) {
          // İşlem tipine göre ekstrenin gelir, gider ve bitiş bakiyesini güncelle
          const newEndBalance = Number(currentStatement.end_balance) + balanceChange;
          
          // Güncelleme işlemini yap
          const updateResult = await StatementUpdateService.updateStatementBalances(
            currentStatement.id,
            currentStatement.income,
            currentStatement.expenses,
            newEndBalance
          );
          
          if (!updateResult.success) {
            this.logger.error('Failed to update start statement', { 
              statementId: currentStatement.id, 
              error: updateResult.error 
            });
            return false;
          }
          
          this.logger.debug('Updated start statement balances', { 
            statementId: currentStatement.id,
            newEndBalance
          });
        } 
        // Sonraki ekstreler
        else {
          const previousStatement = affectedStatements[i - 1];
          
          // Bu ekstrenin başlangıç bakiyesi, önceki ekstrenin bitiş bakiyesi olmalı
          const newStartBalance = Number(previousStatement.end_balance);
          
          // Bitiş bakiyesi, başlangıç bakiyesine göre yeniden hesaplanır
          // Bitiş bakiyesi = Başlangıç bakiyesi + (Gelir - Gider)
          const newEndBalance = newStartBalance + (Number(currentStatement.income) - Number(currentStatement.expenses));
          
          // Güncelleme işlemini yap
          const { data: updatedStatement, error: updateError } = await supabase
            .from('account_statements')
            .update({ 
              start_balance: newStartBalance, 
              end_balance: newEndBalance 
            })
            .eq('id', currentStatement.id)
            .single();
          
          if (updateError) {
            this.logger.error('Failed to update subsequent statement', { 
              statementId: currentStatement.id, 
              error: updateError 
            });
            return false;
          }
          
          this.logger.debug('Updated subsequent statement balances', { 
            statementId: currentStatement.id,
            newStartBalance,
            newEndBalance
          });
        }
      }

      this.logger.info('Successfully completed statement chain update', { 
        accountId, 
        startStatementId,
        affectedStatementsCount: affectedStatements.length
      });
      
      return true;
    } catch (error) {
      this.logger.error('Unexpected error updating statement chain', { 
        accountId, 
        startStatementId, 
        error 
      });
      return false;
    }
  }
}
