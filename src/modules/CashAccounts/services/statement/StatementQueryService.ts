
import { supabase } from '@/integrations/supabase/client';
import { AccountStatement } from '../../types';
import { SingleStatementResponse, StatementListResponse } from '../../types/statement/StatementResponses';
import { serviceLogger } from '../../logging';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

// Ekstre tablosu için sorgu builder tip tanımı
type StatementQueryBuilder = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['account_statements']['Row'],
  Database['public']['Tables']['account_statements']['Row'][]
>;

/**
 * Ekstre sorgulama işlemleri için servis
 */
export class StatementQueryService {
  private static logger = serviceLogger;

  /**
   * Temel Supabase sorgu oluşturucusu
   */
  private static createBaseQuery(): StatementQueryBuilder {
    return supabase.from('account_statements').select('*');
  }

  /**
   * Belirli bir hesaba ait tüm ekstreleri getirir
   */
  static async getStatementsByAccountId(accountId: string): Promise<StatementListResponse> {
    try {
      this.logger.debug('Fetching statements for account', { accountId });
      
      const { data: statements, error } = await this.createBaseQuery()
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
  static async getStatementById(id: string): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Fetching statement by ID', { id });
      
      const { data: statement, error } = await this.createBaseQuery()
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
   * Belirli bir hesap için mevcut aktif dönem ekstresini getirir
   */
  static async getCurrentStatement(accountId: string): Promise<SingleStatementResponse> {
    try {
      this.logger.debug('Fetching current statement for account', { accountId });
      
      const { data: statement, error } = await this.createBaseQuery()
        .eq('account_id', accountId)
        .eq('status', 'open')
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
        data: statement as AccountStatement || null
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
