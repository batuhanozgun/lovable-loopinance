
import { supabase } from '@/integrations/supabase/client';
import { AccountTransaction } from '../../types';
import { SingleTransactionResponse, TransactionListResponse } from '../../types/transaction/TransactionResponses';
import { serviceLogger } from '../../logging';

/**
 * İşlem sorgulama servisi
 */
export class TransactionQueryService {
  private static logger = serviceLogger;

  /**
   * Belirli bir ekstre için tüm işlemleri getirir
   */
  static async getTransactionsByStatementId(statementId: string): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Fetching transactions for statement', { statementId });
      
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('statement_id', statementId)
        .order('transaction_date', { ascending: false })
        .order('transaction_time', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch statement transactions', { statementId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement transactions fetched successfully', { statementId, count: transactions.length });
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching statement transactions', { statementId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * ID'ye göre belirli bir işlemi getirir
   */
  static async getTransactionById(id: string): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Fetching transaction by ID', { id });
      
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        this.logger.error('Failed to fetch transaction by ID', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Transaction fetched successfully', { id });
      return {
        success: true,
        data: transaction as AccountTransaction
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching transaction by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir hesap için tüm işlemleri getirir
   */
  static async getTransactionsByAccountId(accountId: string): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Fetching transactions for account', { accountId });
      
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('account_id', accountId)
        .order('transaction_date', { ascending: false })
        .order('transaction_time', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch account transactions', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Account transactions fetched successfully', { accountId, count: transactions.length });
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching account transactions', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
