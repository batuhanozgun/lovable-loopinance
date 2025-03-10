
import { supabase } from '@/integrations/supabase/client';
import { CreateAccountTransactionData, AccountTransaction } from '../../types';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { TransactionBalanceService } from './TransactionBalanceService';

/**
 * İşlem oluşturma servisi
 */
export class TransactionCreationService {
  private static logger = serviceLogger;

  /**
   * Yeni bir hesap işlemi oluşturur
   */
  static async createTransaction(data: CreateAccountTransactionData): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Creating new account transaction', { data });
      
      const { data: transactionData, error } = await supabase
        .from('account_transactions')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create account transaction', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      // İşlemi ekledikten sonra ilgili ekstrenin bakiyesini güncelleme
      await TransactionBalanceService.updateStatementBalance(transactionData.statement_id);
      
      this.logger.info('Account transaction created successfully', { id: transactionData.id });
      return {
        success: true,
        data: transactionData as AccountTransaction
      };
    } catch (error) {
      this.logger.error('Unexpected error creating account transaction', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
