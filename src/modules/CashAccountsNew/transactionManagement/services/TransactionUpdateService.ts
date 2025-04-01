
/**
 * İşlem güncelleme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { UpdateTransactionData, SingleTransactionResponse, Transaction } from '../types';
import { StatementService } from '../../statementManagement/services/StatementService';
import { TransactionType } from '../types';

/**
 * İşlem güncelleme servisi
 */
export class TransactionUpdateService {
  /**
   * Mevcut bir hesap işlemini günceller
   */
  static async updateTransaction(
    id: string, 
    data: UpdateTransactionData
  ): Promise<SingleTransactionResponse> {
    try {
      console.log('TransactionUpdateService - Updating transaction:', { id, data });
      
      // Mevcut işlem bilgilerini getir
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Failed to fetch transaction for update:', fetchError);
        return { 
          success: false, 
          error: `Failed to fetch transaction: ${fetchError.message}` 
        };
      }
      
      if (!existingTransaction) {
        console.error('Transaction not found for update:', id);
        return { 
          success: false, 
          error: 'Transaction not found' 
        };
      }
      
      // Veri doğrulamalarını yap
      if (data.amount !== undefined && (isNaN(Number(data.amount)) || Number(data.amount) <= 0)) {
        return { 
          success: false, 
          error: 'Amount must be a positive number' 
        };
      }
      
      // API çağrısı ile işlemi güncelle
      const { data: updatedTransaction, error: updateError } = await supabase
        .from('account_transactions')
        .update(data)
        .eq('id', id)
        .select('*')
        .maybeSingle();
      
      if (updateError) {
        console.error('Failed to update transaction:', updateError);
        return { 
          success: false, 
          error: updateError.message 
        };
      }
      
      if (!updatedTransaction) {
        return { 
          success: false, 
          error: 'Transaction updated but no data returned' 
        };
      }
      
      console.log('Transaction updated successfully:', { id: updatedTransaction.id });
      
      // Değişim tutarını hesapla
      let balanceChange = 0;
      
      // Tutar değiştiyse
      if (data.amount !== undefined && Number(data.amount) !== Number(existingTransaction.amount)) {
        const oldAmount = Number(existingTransaction.amount);
        const newAmount = Number(data.amount);
        
        if (existingTransaction.transaction_type === TransactionType.INCOME) {
          // Gelir işlemi: Yeni tutar - eski tutar
          balanceChange = newAmount - oldAmount;
        } else {
          // Gider işlemi: Eski tutar - yeni tutar
          balanceChange = oldAmount - newAmount;
        }
      }
      
      // İşlem türü değiştiyse
      if (data.transaction_type !== undefined && 
          data.transaction_type !== existingTransaction.transaction_type) {
        const amount = data.amount !== undefined ? Number(data.amount) : Number(existingTransaction.amount);
        
        if (existingTransaction.transaction_type === TransactionType.INCOME && 
            data.transaction_type === TransactionType.EXPENSE) {
          // Gelirden gidere: -2 * tutar (gelir kaybı + gider artışı)
          balanceChange -= 2 * amount;
        } else if (existingTransaction.transaction_type === TransactionType.EXPENSE && 
                   data.transaction_type === TransactionType.INCOME) {
          // Giderden gelire: +2 * tutar (gider azalışı + gelir artışı)
          balanceChange += 2 * amount;
        }
      }
      
      // Ekstreleri güncelle
      if (balanceChange !== 0) {
        try {
          console.log('Updating statement chain due to transaction update:', {
            accountId: updatedTransaction.account_id, 
            statementId: updatedTransaction.statement_id,
            balanceChange
          });
          
          // Ekstre zincirini güncelle
          const statementUpdateResult = await StatementService.updateStatementChain(
            updatedTransaction.account_id,
            updatedTransaction.statement_id,
            balanceChange
          );
          
          if (!statementUpdateResult) {
            console.error('Failed to update statement chain after transaction update');
          } else {
            console.log('Statement chain updated successfully after transaction update');
          }
        } catch (error) {
          console.error('Error updating statements after transaction update:', error);
        }
      }
      
      return {
        success: true,
        data: updatedTransaction as Transaction
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Unexpected error updating transaction:', error);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
