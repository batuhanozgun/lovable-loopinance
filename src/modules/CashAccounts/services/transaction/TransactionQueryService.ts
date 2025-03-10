
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
  static async getTransactionsByStatementId(
    statementId: string, 
    options: { 
      sortBy?: 'date' | 'amount', 
      sortOrder?: 'asc' | 'desc',
      transactionType?: 'income' | 'expense' | 'all'
    } = {}
  ): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Fetching transactions for statement', { statementId, options });
      
      const { 
        sortBy = 'date', 
        sortOrder = 'desc',
        transactionType = 'all'
      } = options;
      
      let query = supabase
        .from('account_transactions')
        .select('*')
        .eq('statement_id', statementId);
      
      // Apply transaction type filter if not set to 'all'
      if (transactionType !== 'all') {
        query = query.eq('transaction_type', transactionType);
      }
      
      // Apply sorting
      if (sortBy === 'date') {
        query = query
          .order('transaction_date', { ascending: sortOrder === 'asc' })
          .order('transaction_time', { ascending: sortOrder === 'asc' });
      } else if (sortBy === 'amount') {
        query = query.order('amount', { ascending: sortOrder === 'asc' });
      }
      
      const { data: transactions, error } = await query;
      
      if (error) {
        this.logger.error('Failed to fetch statement transactions', { statementId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement transactions fetched successfully', { 
        statementId, 
        count: transactions.length,
        filters: options
      });
      
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
  static async getTransactionsByAccountId(
    accountId: string,
    options: { 
      sortBy?: 'date' | 'amount', 
      sortOrder?: 'asc' | 'desc',
      transactionType?: 'income' | 'expense' | 'all',
      limit?: number,
      startDate?: string,
      endDate?: string
    } = {}
  ): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Fetching transactions for account', { accountId, options });
      
      const { 
        sortBy = 'date', 
        sortOrder = 'desc',
        transactionType = 'all',
        limit,
        startDate,
        endDate
      } = options;
      
      let query = supabase
        .from('account_transactions')
        .select('*')
        .eq('account_id', accountId);
      
      // Apply transaction type filter if not set to 'all'
      if (transactionType !== 'all') {
        query = query.eq('transaction_type', transactionType);
      }
      
      // Apply date range filters if provided
      if (startDate) {
        query = query.gte('transaction_date', startDate);
      }
      
      if (endDate) {
        query = query.lte('transaction_date', endDate);
      }
      
      // Apply sorting
      if (sortBy === 'date') {
        query = query
          .order('transaction_date', { ascending: sortOrder === 'asc' })
          .order('transaction_time', { ascending: sortOrder === 'asc' });
      } else if (sortBy === 'amount') {
        query = query.order('amount', { ascending: sortOrder === 'asc' });
      }
      
      // Apply limit if provided
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data: transactions, error } = await query;
      
      if (error) {
        this.logger.error('Failed to fetch account transactions', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Account transactions fetched successfully', { 
        accountId, 
        count: transactions.length,
        filters: options
      });
      
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
