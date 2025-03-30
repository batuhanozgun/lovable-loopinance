
/**
 * Ekstre güncelleme işlemleri için servis
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  SingleStatementResponse,
  StatementStatus
} from '../../../types';

/**
 * Ekstre güncelleme işlemleri için servis
 */
export class StatementUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementUpdateService');

  /**
   * Hesap ekstresinin durumunu günceller
   */
  static async updateStatementStatus(id: string, status: StatementStatus): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating statement status', { id, status });
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to update statement status', { id, status, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement status updated successfully', { id, status });
      return {
        success: true,
        data: statement as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error updating statement status', { id, status, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Hesap ekstresinin gelir, gider ve bakiye bilgilerini günceller
   */
  static async updateStatementBalances(
    id: string, 
    income: number, 
    expenses: number,
    endBalance: number
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating statement balances', { id, income, expenses, endBalance });
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .update({ income, expenses, end_balance: endBalance })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to update statement balances', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement balances updated successfully', { id });
      return {
        success: true,
        data: statement as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error updating statement balances', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
