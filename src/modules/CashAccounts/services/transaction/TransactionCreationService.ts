
import { supabase } from '@/integrations/supabase/client';
import { CreateAccountTransactionData, AccountTransaction } from '../../types';
import { SingleTransactionResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';
import { StatementBalanceService } from './statement-balance';

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
      this.logger.debug('Creating new account transaction', { data: JSON.stringify(data) });
      console.log('TransactionCreationService - Creating transaction with data:', data);
      
      // Veri doğrulama kontrolü
      if (!data.account_id) {
        const errorMsg = 'account_id is required but missing';
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.statement_id) {
        const errorMsg = 'statement_id is required but missing';
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_date) {
        const errorMsg = 'transaction_date is required but missing';
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_time) {
        const errorMsg = 'transaction_time is required but missing';
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      // Amount doğrulama - sayı olmalı ve tam sayı değeri
      if (data.amount === undefined || data.amount === null || isNaN(Number(data.amount)) || !Number.isInteger(data.amount)) {
        const errorMsg = `amount is required but missing or invalid (received: ${data.amount}, type: ${typeof data.amount})`;
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_type) {
        const errorMsg = 'transaction_type is required but missing';
        this.logger.error(errorMsg);
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      // API çağrısı
      console.log('Making Supabase API call with validated data');
      const { data: transactionData, error } = await supabase
        .from('account_transactions')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create account transaction', { 
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        console.error('Supabase error creating transaction:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      // İşlemi ekledikten sonra ilgili ekstrenin bakiyesini güncelleme
      console.log('Transaction created successfully, updating statement balance');
      if (transactionData && transactionData.statement_id) {
        await StatementBalanceService.updateStatementBalance(transactionData.statement_id);
      } else {
        console.warn('Transaction created but statement_id is missing for balance update');
      }
      
      this.logger.info('Account transaction created successfully', { id: transactionData?.id });
      console.log('Account transaction created successfully:', { id: transactionData?.id });
      
      return {
        success: true,
        data: transactionData as AccountTransaction
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      
      this.logger.error('Unexpected error creating account transaction', { 
        error: errorMessage,
        stack: errorStack
      });
      console.error('Unexpected error creating account transaction:', { 
        error, 
        message: errorMessage,
        stack: errorStack
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
