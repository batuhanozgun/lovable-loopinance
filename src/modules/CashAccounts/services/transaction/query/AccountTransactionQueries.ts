
import { AccountTransaction } from '../../../types';
import { TransactionListResponse } from '../../../types/transaction/TransactionResponses';
import { TransactionQueryServiceBase } from './TransactionQueryServiceBase';
import { TransactionQueryFilters } from './TransactionQueryFilters';

/**
 * Hesap işlemlerini sorgulama servisi
 */
export class AccountTransactionQueries extends TransactionQueryServiceBase {
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
      
      let query = this.createBaseQuery().eq('account_id', accountId);
      
      // Tüm filtreleri uygula
      query = TransactionQueryFilters.applyTransactionTypeFilter(query, transactionType);
      query = TransactionQueryFilters.applyDateRangeFilter(query, startDate, endDate);
      query = TransactionQueryFilters.applySortingFilter(query, sortBy, sortOrder);
      query = TransactionQueryFilters.applyLimitFilter(query, limit);
      
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
      return {
        success: false,
        error: this.handleError(error, `getTransactionsByAccountId for ${accountId}`)
      };
    }
  }
}
