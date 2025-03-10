
import { supabase } from '@/integrations/supabase/client';
import { serviceLogger } from '../../../logging';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';

/**
 * İşlem sorguları için temel sınıf
 */
export class TransactionQueryServiceBase {
  protected static logger: ILogger = serviceLogger;

  /**
   * Temel Supabase sorgu oluşturucusu
   */
  protected static createBaseQuery() {
    return supabase.from('account_transactions').select('*');
  }

  /**
   * Hata işleme yardımcısı
   */
  protected static handleError(error: any, context: string): string {
    this.logger.error(`Failed in ${context}`, { error });
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
