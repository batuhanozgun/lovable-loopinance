
import { supabase } from '@/integrations/supabase/client';
import { TransactionType } from '../../types';
import { serviceLogger } from '../../logging';
import { StatementService } from '../statement';

/**
 * İşlem bakiye etki hesaplama servisi
 */
export class TransactionBalanceService {
  private static logger = serviceLogger;

  /**
   * İşlemleri kullanarak ekstre bakiyesini günceller
   */
  static async updateStatementBalance(statementId: string): Promise<void> {
    try {
      this.logger.debug('Updating statement balance', { statementId });
      
      // Ekstre içindeki tüm işlemleri al
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('statement_id', statementId);
      
      if (error) {
        this.logger.error('Failed to fetch transactions for balance update', { statementId, error });
        return;
      }
      
      // Ekstrenin detaylarını al
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Failed to fetch statement for balance update', { statementId });
        return;
      }
      
      const statement = statementResponse.data;
      
      // Gelir ve gider toplamlarını hesaplama
      let totalIncome = 0;
      let totalExpenses = 0;
      
      transactions.forEach(transaction => {
        if (transaction.transaction_type === TransactionType.INCOME) {
          totalIncome += Number(transaction.amount);
        } else if (transaction.transaction_type === TransactionType.EXPENSE) {
          totalExpenses += Number(transaction.amount);
        }
      });
      
      // Bitiş bakiyesini hesaplama
      const endBalance = Number(statement.start_balance) + totalIncome - totalExpenses;
      
      // Ekstre bakiyesini güncelleme
      await StatementService.updateStatementBalances(statementId, totalIncome, totalExpenses, endBalance);
      
      this.logger.info('Statement balance updated successfully', { 
        statementId, 
        totalIncome, 
        totalExpenses, 
        endBalance 
      });
    } catch (error) {
      this.logger.error('Unexpected error updating statement balance', { statementId, error });
    }
  }
}
