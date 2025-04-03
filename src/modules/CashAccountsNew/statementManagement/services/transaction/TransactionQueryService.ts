
/**
 * İşlemleri sorgulamak için servis
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { AccountTransaction, TransactionListResponse, transformTransactionData } from '../../types/transaction';

export class TransactionQueryService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionQueryService');

  /**
   * Hesap ID'sine göre işlemleri getir
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
      
      // Verileri doğru enum tipine dönüştürüyoruz
      const transformedData = transactions.map(transaction => transformTransactionData(transaction));
      
      this.logger.info('Account transactions fetched successfully', { accountId, count: transactions.length });
      return {
        success: true,
        data: transformedData
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching account transactions', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Ekstre ID'sine göre işlemleri getir
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
      
      // Verileri doğru enum tipine dönüştürüyoruz
      const transformedData = transactions.map(transaction => transformTransactionData(transaction));
      
      this.logger.info('Statement transactions fetched successfully', { statementId, count: transactions.length });
      return {
        success: true,
        data: transformedData
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
   * ID'ye göre tek işlem getir
   */
  static async getTransactionById(id: string): Promise<TransactionListResponse> {
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
      
      // Veriyi doğru enum tipine dönüştürüyoruz
      const transformedData = transformTransactionData(transaction);
      
      this.logger.info('Transaction fetched successfully', { id });
      return {
        success: true,
        data: [transformedData]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching transaction by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
