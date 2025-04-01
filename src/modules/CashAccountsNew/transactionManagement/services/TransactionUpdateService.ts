
/**
 * İşlem güncelleme servisi
 * İşlemlerin güncellenmesi ve ekstreler üzerindeki etkilerini yönetir
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { Transaction, SingleTransactionResponse } from '../types';
import { StatementChainUpdateService } from '../../statementManagement/services';

/**
 * İşlem güncelleme servisi
 */
export class TransactionUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionUpdateService');

  /**
   * İşlemi günceller
   * @param transactionId İşlem ID
   * @param data Güncellenecek işlem verileri
   * @returns İşlem yanıtı
   */
  static async updateTransaction(
    transactionId: string, 
    data: Partial<Transaction>
  ): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Updating transaction', { transactionId, data });
      
      // Mevcut işlemi getir (bakiye değişimini hesaplamak için)
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch existing transaction for update', { 
          transactionId, 
          error: fetchError 
        });
        return {
          success: false,
          error: fetchError.message
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
        this.logger.error('Failed to update transaction', { 
          transactionId, 
          error: updateError 
        });
        return {
          success: false,
          error: updateError.message
        };
      }
      
      // Ekstre bakiye değişimini güncelle
      if (data.amount !== undefined && existingTransaction && 
          updatedTransaction.transaction_type === existingTransaction.transaction_type) {
        // Bakiye değişimi hesapla (yeni tutar - eski tutar)
        const amountDifference = Number(data.amount) - Number(existingTransaction.amount);
        
        if (amountDifference !== 0) {
          // Bakiye değişimi işlem tipine göre ayarlanır
          const balanceChange = updatedTransaction.transaction_type === 'income' 
            ? amountDifference  // Gelir için pozitif değişim
            : -amountDifference; // Gider için negatif değişim
          
          // Ekstre zincirini güncelle
          const chainUpdateResult = await StatementChainUpdateService.updateStatementChain(
            updatedTransaction.account_id,
            updatedTransaction.statement_id,
            balanceChange
          );
          
          if (!chainUpdateResult) {
            this.logger.warn('Statement chain update failed after transaction update', {
              transactionId,
              statementId: updatedTransaction.statement_id
            });
            // İşlemi güncellemeye devam ediyoruz ancak ekstre güncelleme başarısız oldu
          }
        }
      }
      
      this.logger.info('Transaction updated successfully', { 
        transactionId, 
        transaction: updatedTransaction 
      });
      
      return {
        success: true,
        data: updatedTransaction as Transaction
      };
    } catch (error) {
      this.logger.error('Unexpected error updating transaction', { 
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
