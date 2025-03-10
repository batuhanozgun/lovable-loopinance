
import { supabase } from '@/integrations/supabase/client';
import { 
  AccountStatement, 
  AccountStatementResponse,
  CreateAccountStatementData, 
  StatementStatus 
} from '../types';
import { serviceLogger } from '../logging';
import { format } from 'date-fns';

/**
 * Hesap ekstreleri yönetmek için servis
 */
export class StatementService {
  private static logger = serviceLogger;

  /**
   * Yeni bir hesap ekstresi oluşturur
   */
  static async createStatement(data: CreateAccountStatementData): Promise<AccountStatementResponse> {
    try {
      this.logger.debug('Creating new account statement', { data });
      
      const { data: statementData, error } = await supabase
        .from('account_statements')
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
   * Belirli bir hesaba ait tüm ekstreleri getirir
   */
  static async getStatementsByAccountId(accountId: string): Promise<AccountStatementResponse> {
    try {
      this.logger.debug('Fetching statements for account', { accountId });
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .order('start_date', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch account statements', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Account statements fetched successfully', { accountId, count: statements.length });
      return {
        success: true,
        data: statements as AccountStatement[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching account statements', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * ID'ye göre belirli bir hesap ekstresini getirir
   */
  static async getStatementById(id: string): Promise<AccountStatementResponse> {
    try {
      this.logger.debug('Fetching statement by ID', { id });
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        this.logger.error('Failed to fetch statement by ID', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement fetched successfully', { id });
      return {
        success: true,
        data: statement as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching statement by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Hesap ekstresinin durumunu günceller
   */
  static async updateStatementStatus(id: string, status: StatementStatus): Promise<AccountStatementResponse> {
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
  ): Promise<AccountStatementResponse> {
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

  /**
   * Belirli bir hesap için yeni bir dönem başlatır (ekstre oluşturur)
   * Önceki dönemin bitiş bakiyesini kullanır
   */
  static async createNextStatement(
    accountId: string,
    startDate: Date,
    endDate: Date,
    previousStatement?: AccountStatement
  ): Promise<AccountStatementResponse> {
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

  /**
   * Belirli bir hesap için mevcut aktif dönem ekstresini getirir
   */
  static async getCurrentStatement(accountId: string): Promise<AccountStatementResponse> {
    try {
      this.logger.debug('Fetching current statement for account', { accountId });
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.OPEN)
        .order('start_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        this.logger.error('Failed to fetch current statement', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Current statement fetched successfully', { accountId, statementId: statement?.id });
      return {
        success: true,
        data: statement as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching current statement', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
