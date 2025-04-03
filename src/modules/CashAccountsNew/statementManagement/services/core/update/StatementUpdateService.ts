
/**
 * Ekstre güncelleme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  SingleStatementResponse, 
  StatementStatus 
} from '../../../types';

/**
 * Ekstre güncelleme servisi
 */
export class StatementUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementUpdateService');

  /**
   * Ekstre durumunu günceller
   */
  static async updateStatementStatus(
    id: string, 
    status: StatementStatus
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating statement status', { id, status });
      
      const { data, error } = await supabase
        .from('cash_account_statements')
        .update({ status, updated_at: new Date().toISOString() })
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
      
      this.logger.info('Statement status updated', { id, status });
      return {
        success: true,
        data: data as AccountStatement
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
   * Ekstre bakiyelerini günceller (gelir, gider, bitiş bakiyesi)
   */
  static async updateStatementBalances(
    id: string, 
    income: number, 
    expenses: number,
    endBalance: number
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Updating statement balances', { id, income, expenses, endBalance });
      
      const { data, error } = await supabase
        .from('cash_account_statements')
        .update({ 
          income, 
          expenses, 
          end_balance: endBalance,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to update statement balances', { 
          id, income, expenses, endBalance, error 
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement balances updated', { id, income, expenses, endBalance });
      return {
        success: true,
        data: data as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error updating statement balances', { 
        id, income, expenses, endBalance, error 
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
