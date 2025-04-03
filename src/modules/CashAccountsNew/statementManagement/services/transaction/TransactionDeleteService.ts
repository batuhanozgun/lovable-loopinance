
/**
 * İşlem silme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementTransactionResponse } from '../../types/transaction';
import { StatementBalanceCalculationService } from '../core/calculation/StatementBalanceCalculationService';

/**
 * İşlem silme servisi
 */
export class TransactionDeleteService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionDeleteService');
  
  /**
   * Belirtilen işlemi siler ve bağlı olduğu ekstreleri günceller
   */
  static async deleteTransaction(id: string): Promise<StatementTransactionResponse> {
    try {
      this.logger.debug('Deleting transaction', { id });
      
      // Önce işlem bilgilerini getir (silmeden önce)
      const { data: transaction, error: getError } = await supabase
        .from('cash_account_transactions')
        .select('id, statement_id, account_id')
        .eq('id', id)
        .single();
      
      if (getError) {
        this.logger.error('Failed to get transaction before delete', { id, error: getError });
        return {
          success: false,
          error: getError.message
        };
      }
      
      // İşlemi sil
      const { error: deleteError } = await supabase
        .from('cash_account_transactions')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        this.logger.error('Failed to delete transaction', { id, error: deleteError });
        return {
          success: false,
          error: deleteError.message
        };
      }
      
      this.logger.info('Transaction deleted successfully', { id });
      
      // İşlem silindikten sonra ekstre bakiyelerini güncelle
      try {
        await StatementBalanceCalculationService.calculateAndUpdateStatementBalance(
          transaction.statement_id,
          transaction.account_id,
          true  // Zincirleme güncelleme yap
        );
      } catch (calcError) {
        // İşlem silme başarılı olsa bile, bakiye hesaplama hatası loglanmalı
        this.logger.error('Error recalculating balances after delete', { 
          transactionId: id, 
          statementId: transaction.statement_id,
          error: calcError 
        });
      }
      
      return {
        success: true
      };
    } catch (error) {
      this.logger.error('Unexpected error deleting transaction', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
