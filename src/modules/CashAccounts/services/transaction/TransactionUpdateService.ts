
import { supabase } from '@/integrations/supabase/client';
import { AccountTransaction } from '../../types';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { StatementBalanceService } from './statement-balance';

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
      
      // Ekstre durumunu kontrol et
      const { data: statement, error: statementError } = await supabase
        .from('account_statements')
        .select('status, account_id')
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
      
      // Ekstre kapalı mı kontrol et
      if (statement.status === 'closed') {
        const errorMsg = 'Cannot update transaction - statement is closed';
        this.logger.error(errorMsg);
        return {
          success: false,
          error: errorMsg
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
      // Kapalı ekstre ise, sonraki ekstreleri de cascade olarak güncelle
      const isClosedStatement = statement.status === 'closed';
      await StatementBalanceService.handleTransactionChange(
        existingTransaction.statement_id,
        statement.account_id,
        isClosedStatement
      );
      
      this.logger.info('Transaction updated successfully', { 
        id: transactionId,
        inClosedStatement: isClosedStatement
      });
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
