
import { supabase } from '@/integrations/supabase/client';
import { AccountTransaction } from '../../types';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { TransactionBalanceService } from './TransactionBalanceService';

/**
 * İşlem güncelleme servisi
 */
export class TransactionUpdateService {
  private static logger = serviceLogger;

  /**
   * Bir hesap işlemini günceller
   */
  static async updateTransaction(
    transactionId: string,
    data: Partial<AccountTransaction>
  ): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Updating account transaction', { id: transactionId, data });
      
      // Önce işlemi veritabanından getir
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch transaction for update', { id: transactionId, error: fetchError });
        return {
          success: false,
          error: fetchError.message
        };
      }
      
      // Ekstre durumunu kontrol et - şimdilik sadece açık ekstreler için güncelleme izin ver
      const { data: statement, error: statementError } = await supabase
        .from('account_statements')
        .select('status')
        .eq('id', existingTransaction.statement_id)
        .single();
      
      if (statementError) {
        this.logger.error('Failed to fetch statement for transaction update', { 
          statementId: existingTransaction.statement_id, 
          error: statementError 
        });
        return {
          success: false,
          error: 'Failed to verify statement status'
        };
      }
      
      if (statement.status !== 'open') {
        this.logger.warn('Cannot update transaction in a closed statement', { 
          transactionId, 
          statementId: existingTransaction.statement_id,
          status: statement.status 
        });
        return {
          success: false,
          error: 'Cannot update transactions in a closed statement'
        };
      }
      
      // İşlemi güncelle
      const { data: updatedTransaction, error: updateError } = await supabase
        .from('account_transactions')
        .update(data)
        .eq('id', transactionId)
        .select()
        .single();
      
      if (updateError) {
        this.logger.error('Failed to update transaction', { id: transactionId, error: updateError });
        return {
          success: false,
          error: updateError.message
        };
      }
      
      // İşlemi güncelledikten sonra ilgili ekstrenin bakiyesini güncelleme
      await TransactionBalanceService.updateStatementBalance(existingTransaction.statement_id);
      
      this.logger.info('Transaction updated successfully', { id: transactionId });
      return {
        success: true,
        data: updatedTransaction as AccountTransaction
      };
    } catch (error) {
      this.logger.error('Unexpected error updating transaction', { id: transactionId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
