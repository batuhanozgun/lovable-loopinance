
/**
 * Ekstre oluşturma işlemleri için servis
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  SingleStatementResponse,
  StatementStatus
} from '../../../types';
import { format } from 'date-fns';

/**
 * Ekstre oluşturma işlemleri için servis
 */
export class StatementCreationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementCreationService');

  /**
   * Yeni bir hesap ekstresi oluşturur
   */
  static async createStatement(data: CreateAccountStatementData): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Creating new account statement', { data });
      
      const { data: statementData, error } = await supabase
        .from('cash_account_statements')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create account statement', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Account statement created successfully', { id: statementData.id });
      return {
        success: true,
        data: statementData as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error creating account statement', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir hesap için yeni bir dönem başlatır (ekstre oluşturur)
   * Önceki dönemin bitiş bakiyesini kullanır
   */
  static async createNextStatement(
    accountId: string,
    startDate: Date,
    endDate: Date,
    previousStatement?: AccountStatement
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Creating next statement period', { 
        accountId, 
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        previousStatementId: previousStatement?.id 
      });
      
      // Önceki ekstre yoksa, hesabın başlangıç bakiyesini alma
      let startBalance = 0;
      if (!previousStatement) {
        const { data: account, error: accountError } = await supabase
          .from('cash_accounts')
          .select('initial_balance')
          .eq('id', accountId)
          .single();
        
        if (accountError) {
          this.logger.error('Failed to fetch account initial balance', { accountId, error: accountError });
          return {
            success: false,
            error: accountError.message
          };
        }
        
        startBalance = account.initial_balance;
      } else {
        startBalance = previousStatement.end_balance;
      }
      
      const newStatement: CreateAccountStatementData = {
        account_id: accountId,
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: format(endDate, 'yyyy-MM-dd'),
        start_balance: startBalance,
        end_balance: startBalance, // Başlangıçta bitiş bakiyesi, başlangıç bakiyesi ile aynıdır
        status: StatementStatus.OPEN
      };
      
      return await this.createStatement(newStatement);
    } catch (error) {
      this.logger.error('Unexpected error creating next statement', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
