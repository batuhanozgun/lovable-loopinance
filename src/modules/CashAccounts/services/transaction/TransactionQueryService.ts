
import { supabase } from '@/integrations/supabase/client';
import { TransactionQueryFilters } from './query/TransactionQueryFilters';
import { TransactionQueryServiceBase } from './query/TransactionQueryServiceBase';
import { AccountTransaction } from '../../types';
import { SingleTransactionResponse, TransactionListResponse } from '../../types/transaction/TransactionResponses';

/**
 * İşlem sorgulama servisi
 */
export class TransactionQueryService extends TransactionQueryServiceBase {
  /**
   * ID'ye göre işlem getirme
   */
  static async getTransactionById(id: string): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Getting transaction by ID', { id });
      
      const { data: transaction, error } = await this.createBaseQuery()
        .eq('id', id)
        .single();
      
      if (error) {
        const errorMessage = this.handleError(error, 'getTransactionById');
        return {
          success: false,
          error: errorMessage
        };
      }
      
      this.logger.info('Successfully retrieved transaction', { id });
      return {
        success: true,
        data: transaction
      };
    } catch (error) {
      const errorMessage = this.handleError(error, 'getTransactionById');
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Hesaba göre işlemleri getirme
   */
  static async getTransactionsByAccountId(
    accountId: string,
    options?: {
      startDate?: string;
      endDate?: string;
      transactionType?: 'income' | 'expense' | 'all';
      sortBy?: 'date' | 'amount';
      sortOrder?: 'asc' | 'desc';
      limit?: number;
    }
  ): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Getting transactions by account ID', { accountId, options });
      
      let query = this.createBaseQuery().eq('account_id', accountId);
      
      // Filtreler uygulama
      if (options) {
        const { startDate, endDate, transactionType, sortBy, sortOrder, limit } = options;
        
        query = TransactionQueryFilters.applyDateRangeFilter(query, startDate, endDate);
        query = TransactionQueryFilters.applyTransactionTypeFilter(query, transactionType);
        query = TransactionQueryFilters.applySortingFilter(query, sortBy, sortOrder);
        query = TransactionQueryFilters.applyLimitFilter(query, limit);
      } else {
        // Varsayılan sıralama: tarih, azalan
        query = TransactionQueryFilters.applySortingFilter(query, 'date', 'desc');
      }
      
      const { data: transactions, error } = await query;
      
      if (error) {
        const errorMessage = this.handleError(error, 'getTransactionsByAccountId');
        return {
          success: false,
          error: errorMessage
        };
      }
      
      this.logger.info('Successfully retrieved transactions for account', { 
        accountId, 
        count: transactions.length 
      });
      
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      const errorMessage = this.handleError(error, 'getTransactionsByAccountId');
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Ekstre ID'sine göre işlemleri getirme
   */
  static async getTransactionsByStatementId(
    statementId: string,
    options?: {
      startDate?: string;
      endDate?: string;
      transactionType?: 'income' | 'expense' | 'all';
      sortBy?: 'date' | 'amount';
      sortOrder?: 'asc' | 'desc';
      limit?: number;
    }
  ): Promise<TransactionListResponse> {
    try {
      this.logger.debug('Getting transactions by statement ID', { statementId, options });
      
      let query = this.createBaseQuery().eq('statement_id', statementId);
      
      // Filtreler uygulama
      if (options) {
        const { startDate, endDate, transactionType, sortBy, sortOrder, limit } = options;
        
        query = TransactionQueryFilters.applyDateRangeFilter(query, startDate, endDate);
        query = TransactionQueryFilters.applyTransactionTypeFilter(query, transactionType);
        query = TransactionQueryFilters.applySortingFilter(query, sortBy, sortOrder);
        query = TransactionQueryFilters.applyLimitFilter(query, limit);
      } else {
        // Varsayılan sıralama: tarih, azalan
        query = TransactionQueryFilters.applySortingFilter(query, 'date', 'desc');
      }
      
      const { data: transactions, error } = await query;
      
      if (error) {
        const errorMessage = this.handleError(error, 'getTransactionsByStatementId');
        return {
          success: false,
          error: errorMessage
        };
      }
      
      this.logger.info('Successfully retrieved transactions for statement', { 
        statementId, 
        count: transactions.length 
      });
      
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      const errorMessage = this.handleError(error, 'getTransactionsByStatementId');
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Dönem içindeki işlemleri kategorilerine göre gruplayarak getirir
   */
  static async getTransactionsByCategory(statementId: string): Promise<any> {
    try {
      this.logger.debug('Getting transactions grouped by category', { statementId });
      
      const { data, error } = await supabase
        .from('account_transactions')
        .select(`
          amount, 
          transaction_type, 
          category_id, 
          categories(name)
        `)
        .eq('statement_id', statementId);
      
      if (error) {
        const errorMessage = this.handleError(error, 'getTransactionsByCategory');
        return {
          success: false,
          error: errorMessage
        };
      }
      
      // Kategori bazında gruplandırma
      const groupedTransactions = data.reduce((acc: any, transaction) => {
        const categoryId = transaction.category_id || 'uncategorized';
        const categoryName = transaction.categories?.name || 'Kategorisiz';
        
        if (!acc[categoryId]) {
          acc[categoryId] = {
            categoryId,
            categoryName,
            income: 0,
            expense: 0,
            total: 0
          };
        }
        
        if (transaction.transaction_type === 'income') {
          acc[categoryId].income += Number(transaction.amount);
          acc[categoryId].total += Number(transaction.amount);
        } else if (transaction.transaction_type === 'expense') {
          acc[categoryId].expense += Number(transaction.amount);
          acc[categoryId].total -= Number(transaction.amount);
        }
        
        return acc;
      }, {});
      
      this.logger.info('Successfully retrieved transactions grouped by category', { 
        statementId, 
        categoriesCount: Object.keys(groupedTransactions).length 
      });
      
      return {
        success: true,
        data: Object.values(groupedTransactions)
      };
    } catch (error) {
      const errorMessage = this.handleError(error, 'getTransactionsByCategory');
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
