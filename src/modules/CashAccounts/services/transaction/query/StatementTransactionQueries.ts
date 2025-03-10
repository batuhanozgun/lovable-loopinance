
import { AccountTransaction } from '../../../types';
import { TransactionListResponse } from '../../../types/transaction/TransactionResponses';
import { TransactionQueryServiceBase } from './TransactionQueryServiceBase';
import { TransactionQueryFilters } from './TransactionQueryFilters';

/**
 * Ekstre işlemlerini sorgulama servisi
 */
export class StatementTransactionQueries extends TransactionQueryServiceBase {
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
      
      let query = this.createBaseQuery().eq('statement_id', statementId);
      
      // Filtrelemeleri uygula
      query = TransactionQueryFilters.applyTransactionTypeFilter(query, transactionType);
      query = TransactionQueryFilters.applySortingFilter(query, sortBy, sortOrder);
      
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
      return {
        success: false,
        error: this.handleError(error, `getTransactionsByStatementId for ${statementId}`)
      };
    }
  }
}
