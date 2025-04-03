
/**
 * Ekstre oluşturma servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  SingleStatementResponse 
} from '../../../types';
import { CashAccount } from '../../../../cashAccountHomepage/types';
import { StatementPeriodService } from '../period/StatementPeriodService';
import { isValidDate } from '../shared/utils';

/**
 * Hesap ekstresi oluşturma servisi
 */
export class StatementCreationService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementCreationService');

  /**
   * Yeni bir hesap ekstresi oluşturur
   */
  static async createStatement(data: CreateAccountStatementData): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Creating new statement', { data });
      
      // Tarih kontrolü
      if (!isValidDate(data.start_date) || !isValidDate(data.end_date)) {
        this.logger.error('Invalid dates for statement', { data });
        return {
          success: false,
          error: 'Geçersiz başlangıç veya bitiş tarihi'
        };
      }
      
      // Ekstre veritabanına kaydet
      const { data: statement, error } = await supabase
        .from('cash_account_statements')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create statement', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement created successfully', { id: statement.id });
      
      return {
        success: true,
        data: statement as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error creating statement', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir hesap için yeni bir dönem başlatır
   * Önceki dönemin bitiş bakiyesini kullanır veya yeni bir başlangıç bakiyesi belirler
   */
  static async createNextStatement(
    accountId: string,
    startDate: Date,
    endDate: Date,
    previousStatement?: AccountStatement
  ): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Creating next statement', { 
        accountId, 
        startDate, 
        endDate,
        hasPreviousStatement: !!previousStatement
      });
      
      // Başlangıç bakiyesini belirle
      const startBalance = previousStatement 
        ? previousStatement.end_balance 
        : await this.getAccountInitialBalance(accountId);
      
      if (startBalance === null) {
        this.logger.error('Failed to determine start balance', { accountId });
        return {
          success: false,
          error: 'Başlangıç bakiyesi belirlenemedi'
        };
      }
      
      // Yeni ekstre verilerini oluştur
      const newStatementData: CreateAccountStatementData = {
        account_id: accountId,
        start_date: startDate.toISOString().split('T')[0],  // YYYY-MM-DD formatı
        end_date: endDate.toISOString().split('T')[0],      // YYYY-MM-DD formatı
        start_balance: startBalance,
        end_balance: startBalance,  // Başlangıçta başlangıç bakiyesi ile aynı
        status: 'OPEN'
      };
      
      // Yeni ekstreyi oluştur
      return await this.createStatement(newStatementData);
    } catch (error) {
      this.logger.error('Unexpected error creating next statement', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Hesabın başlangıç bakiyesini getirir
   */
  private static async getAccountInitialBalance(accountId: string): Promise<number | null> {
    try {
      const { data, error } = await supabase
        .from('cash_accounts')
        .select('initial_balance')
        .eq('id', accountId)
        .single();
      
      if (error) {
        this.logger.error('Failed to get account initial balance', { accountId, error });
        return null;
      }
      
      return data.initial_balance;
    } catch (error) {
      this.logger.error('Unexpected error getting account initial balance', { accountId, error });
      return null;
    }
  }
}
