
import { supabase } from '@/integrations/supabase/client';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { TransactionBalanceService } from './TransactionBalanceService';

/**
 * İşlem silme servisi
 */
export class TransactionDeletionService {
  private static logger = serviceLogger;

  /**
   * Bir hesap işlemini siler (soft delete)
   */
  static async deleteTransaction(transactionId: string): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Deleting account transaction', { id: transactionId });
      
      // Önce işlemi veritabanından getir
      const { data: transaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch transaction for deletion', { id: transactionId, error: fetchError });
        return {
          success: false,
          error: fetchError.message
        };
      }
      
      // Ekstre durumunu kontrol et - şimdilik sadece açık ekstreler için silme izin ver
      const { data: statement, error: statementError } = await supabase
        .from('account_statements')
        .select('status')
        .eq('id', transaction.statement_id)
        .single();
      
      if (statementError) {
        this.logger.error('Failed to fetch statement for transaction deletion', { 
          statementId: transaction.statement_id, 
          error: statementError 
        });
        return {
          success: false,
          error: 'Failed to verify statement status'
        };
      }
      
      if (statement.status !== 'open') {
        this.logger.warn('Cannot delete transaction in a closed statement', { 
          transactionId, 
          statementId: transaction.statement_id,
          status: statement.status 
        });
        return {
          success: false,
          error: 'Cannot delete transactions in a closed statement'
        };
      }
      
      // Gerçek silme işlemi (şimdilik hard delete, ileride soft delete yapılabilir)
      const { error: deleteError } = await supabase
        .from('account_transactions')
        .delete()
        .eq('id', transactionId);
      
      if (deleteError) {
        this.logger.error('Failed to delete transaction', { id: transactionId, error: deleteError });
        return {
          success: false,
          error: deleteError.message
        };
      }
      
      // İşlemi sildikten sonra ilgili ekstrenin bakiyesini güncelleme
      await TransactionBalanceService.updateStatementBalance(transaction.statement_id);
      
      this.logger.info('Transaction deleted successfully', { id: transactionId });
      return {
        success: true
      };
    } catch (error) {
      this.logger.error('Unexpected error deleting transaction', { id: transactionId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
