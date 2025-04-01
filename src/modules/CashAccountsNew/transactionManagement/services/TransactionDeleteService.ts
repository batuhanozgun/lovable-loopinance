
/**
 * İşlem silme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { SingleTransactionResponse, Transaction, TransactionType } from '../types';
import { StatementService } from '../../statementManagement/services/StatementService';

/**
 * İşlem silme servisi
 */
export class TransactionDeleteService {
  /**
   * Bir işlemi siler
   */
  static async deleteTransaction(id: string): Promise<SingleTransactionResponse> {
    try {
      console.log('TransactionDeleteService - Deleting transaction:', id);
      
      // Önce silinecek işlemi getir
      const { data: transaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Failed to fetch transaction for deletion:', fetchError);
        return { 
          success: false, 
          error: `Failed to fetch transaction: ${fetchError.message}` 
        };
      }
      
      if (!transaction) {
        console.error('Transaction not found for deletion:', id);
        return { 
          success: false, 
          error: 'Transaction not found' 
        };
      }
      
      // İşlemi sil
      const { error: deleteError } = await supabase
        .from('account_transactions')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        console.error('Failed to delete transaction:', deleteError);
        return { 
          success: false, 
          error: deleteError.message 
        };
      }
      
      console.log('Transaction deleted successfully:', id);
      
      // Bakiye değişimini hesapla
      let balanceChange = 0;
      
      if (transaction.transaction_type === TransactionType.INCOME) {
        // Gelir işlemi silindi: Negatif değişim
        balanceChange = -Number(transaction.amount);
      } else if (transaction.transaction_type === TransactionType.EXPENSE) {
        // Gider işlemi silindi: Pozitif değişim
        balanceChange = Number(transaction.amount);
      }
      
      // Ekstre zincirini güncelle
      try {
        console.log('Updating statement chain after transaction deletion:', {
          accountId: transaction.account_id, 
          statementId: transaction.statement_id,
          balanceChange
        });
        
        const statementUpdateResult = await StatementService.updateStatementChain(
          transaction.account_id,
          transaction.statement_id,
          balanceChange
        );
        
        if (!statementUpdateResult) {
          console.error('Failed to update statement chain after transaction deletion');
        } else {
          console.log('Statement chain updated successfully after transaction deletion');
        }
      } catch (error) {
        console.error('Error updating statements after transaction deletion:', error);
      }
      
      return {
        success: true,
        data: transaction as Transaction
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Unexpected error deleting transaction:', error);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
