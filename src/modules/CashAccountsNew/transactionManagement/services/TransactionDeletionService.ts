
/**
 * İşlem silme servisi
 * İşlemlerin silinmesi ve ekstreler üzerindeki etkilerini yönetir
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SingleTransactionResponse, Transaction } from '../types';
import { StatementChainUpdateService } from '../../statementManagement/services';

/**
 * İşlem silme servisi
 */
export class TransactionDeletionService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionDeletionService');

  /**
   * İşlemi siler
   * @param transactionId İşlem ID
   * @returns İşlem yanıtı
   */
  static async deleteTransaction(transactionId: string): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Deleting transaction', { transactionId });
      
      // Silinecek işlemi getir (bakiye değişimini hesaplamak için)
      const { data: transaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch transaction for deletion', { 
          transactionId, 
          error: fetchError 
        });
        return {
          success: false,
          error: fetchError.message
        };
      }
      
      // İşlemi sil
      const { error: deleteError } = await supabase
        .from('account_transactions')
        .delete()
        .eq('id', transactionId);
      
      if (deleteError) {
        this.logger.error('Failed to delete transaction', { 
          transactionId, 
          error: deleteError 
        });
        return {
          success: false,
          error: deleteError.message
        };
      }
      
      // Ekstre bakiye değişimini güncelle
      if (transaction) {
        // Bakiye değişimi işlem tipine göre hesaplanır
        const balanceChange = transaction.transaction_type === 'income'
          ? -Number(transaction.amount)  // Gelirin silinmesi negatif etki
          : Number(transaction.amount);  // Giderin silinmesi pozitif etki
        
        // Ekstre zincirini güncelle
        const chainUpdateResult = await StatementChainUpdateService.updateStatementChain(
          transaction.account_id,
          transaction.statement_id,
          balanceChange
        );
        
        if (!chainUpdateResult) {
          this.logger.warn('Statement chain update failed after transaction deletion', {
            transactionId,
            statementId: transaction.statement_id
          });
          // İşlemi silmeye devam ediyoruz ancak ekstre güncelleme başarısız oldu
        }
      }
      
      this.logger.info('Transaction deleted successfully', { 
        transactionId, 
        accountId: transaction?.account_id,
        statementId: transaction?.statement_id
      });
      
      return {
        success: true,
        data: transaction as Transaction
      };
    } catch (error) {
      this.logger.error('Unexpected error deleting transaction', { 
        transactionId, 
        error 
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
