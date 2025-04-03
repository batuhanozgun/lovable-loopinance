
/**
 * Ekstre sorgulama servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  SingleStatementResponse, 
  StatementListResponse, 
  StatementStatus 
} from '../../../types';

/**
 * Ekstre sorgulama servisi
 */
export class StatementQueryService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementQueryService');

  /**
   * Hesap ID'sine göre tüm ekstreleri getirir
   */
  static async getStatementsByAccountId(accountId: string): Promise<StatementListResponse> {
    try {
      this.logger.debug('Getting statements by account ID', { accountId });
      
      const { data, error } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('account_id', accountId)
        .order('start_date', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to get statements by account ID', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info(`Found ${data.length} statements for account`, { accountId });
      
      return {
        success: true,
        data: data as AccountStatement[]
      };
    } catch (error) {
      this.logger.error('Unexpected error getting statements by account ID', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * ID'ye göre belirli bir ekstreyi getirir
   */
  static async getStatementById(id: string): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Getting statement by ID', { id });
      
      const { data, error } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        this.logger.error('Failed to get statement by ID', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true,
        data: data as AccountStatement
      };
    } catch (error) {
      this.logger.error('Unexpected error getting statement by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir hesap için mevcut aktif dönem ekstresini getirir
   */
  static async getCurrentStatement(accountId: string): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Getting current statement for account', { accountId });
      
      // Önce OPEN durumunda olan ekstreyi deneyelim
      const { data: openStatement, error: openError } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.OPEN)
        .order('end_date', { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (openError) {
        this.logger.error('Failed to get open statement', { accountId, error: openError });
        return {
          success: false,
          error: openError.message
        };
      }
      
      // Eğer OPEN durumunda ekstre varsa, onu döndür
      if (openStatement) {
        return {
          success: true,
          data: openStatement as AccountStatement
        };
      }
      
      // OPEN durumunda ekstre yoksa, FUTURE durumundaki ilk ekstreyi deneyelim
      const { data: futureStatement, error: futureError } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.FUTURE)
        .order('start_date', { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (futureError) {
        this.logger.error('Failed to get future statement', { accountId, error: futureError });
        return {
          success: false,
          error: futureError.message
        };
      }
      
      // Eğer FUTURE durumunda ekstre varsa, onu döndür
      if (futureStatement) {
        return {
          success: true,
          data: futureStatement as AccountStatement
        };
      }
      
      // Son olarak, en son CLOSED durumundaki ekstreyi deneyelim
      const { data: closedStatement, error: closedError } = await supabase
        .from('cash_account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.CLOSED)
        .order('end_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (closedError) {
        this.logger.error('Failed to get closed statement', { accountId, error: closedError });
        return {
          success: false,
          error: closedError.message
        };
      }
      
      // Eğer CLOSED durumunda ekstre varsa, onu döndür
      if (closedStatement) {
        return {
          success: true,
          data: closedStatement as AccountStatement
        };
      }
      
      // Hiçbir ekstre bulunamazsa, hata döndür
      this.logger.warn('No statement found for account', { accountId });
      return {
        success: false,
        error: 'Bu hesap için ekstre bulunamadı'
      };
    } catch (error) {
      this.logger.error('Unexpected error getting current statement', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
