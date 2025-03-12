
import { supabase } from '@/integrations/supabase/client';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { StatementBalanceService } from './statement-balance';

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
      
      // Ekstre durumunu kontrol et
      const { data: statement, error: statementError } = await supabase
        .from('account_statements')
        .select('status, account_id')
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
      
      // Ekstre kapalı mı kontrol et
      if (statement.status === 'closed') {
        const errorMsg = 'Cannot delete transaction - statement is closed';
        this.logger.error(errorMsg);
        return {
          success: false,
          error: errorMsg
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
      // Kapalı ekstre ise, sonraki ekstreleri de cascade olarak güncelle
      const isClosedStatement = statement.status === 'closed';
      await StatementBalanceService.handleTransactionChange(
        transaction.statement_id,
        statement.account_id,
        isClosedStatement
      );
      
      this.logger.info('Transaction deleted successfully', { 
        id: transactionId,
        inClosedStatement: isClosedStatement
      });
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
