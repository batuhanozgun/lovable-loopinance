
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementService } from '../../statementManagement/services/StatementService';
import { CreateTransactionData, Transaction, TransactionResponse } from '../types';

/**
 * İşlem oluşturma servisi
 */
export class TransactionCreationService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionCreationService');

  /**
   * Yeni bir işlem oluşturur ve kaydeder
   * @param data İşlem verileri
   * @returns İşlem sonucu
   */
  static async createTransaction(data: CreateTransactionData): Promise<TransactionResponse> {
    try {
      this.logger.debug('Creating new transaction', { data });
      
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create transaction', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Transaction created successfully', { id: transaction.id });
      
      // İşlem oluşturulduktan sonra ekstre bakiyelerini güncelle
      await StatementService.recalculateStatementBalance(
        data.statement_id,
        data.account_id
      );
      
      return {
        success: true,
        data: transaction as Transaction
      };
    } catch (error) {
      this.logger.error('Unexpected error creating transaction', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
