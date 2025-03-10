
import { AccountTransaction } from '../../../types';
import { SingleTransactionResponse } from '../../../types/transaction/TransactionResponses';
import { TransactionQueryServiceBase } from './TransactionQueryServiceBase';

/**
 * Tekil işlem sorguları servisi
 */
export class SingleTransactionQueries extends TransactionQueryServiceBase {
  /**
   * ID'ye göre belirli bir işlemi getirir
   */
  static async getTransactionById(id: string): Promise<SingleTransactionResponse> {
    try {
      this.logger.debug('Fetching transaction by ID', { id });
      
      const { data: transaction, error } = await this.createBaseQuery()
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
      return {
        success: false,
        error: this.handleError(error, `getTransactionById for ${id}`)
      };
    }
  }
}
