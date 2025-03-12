
import { supabase } from '@/integrations/supabase/client';
import { serviceLogger } from '../../../logging';

/**
 * Ekstre arama servisi
 */
export class StatementFinder {
  private static logger = serviceLogger;

  /**
   * Belirli bir tarihten sonraki ekstreleri bulur (cascade yeniden hesaplama için)
   */
  static async findStatementsToUpdate(accountId: string, referenceDate: Date): Promise<string[]> {
    try {
      this.logger.debug('Finding statements to update after date', { accountId, referenceDate });
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('id')
        .eq('account_id', accountId)
        .gte('start_date', referenceDate.toISOString().split('T')[0])
        .order('start_date', { ascending: true });
      
      if (error) {
        this.logger.error('Failed to find statements to update', { accountId, referenceDate, error });
        return [];
      }
      
      return statements?.map(s => s.id) || [];
    } catch (error) {
      this.logger.error('Unexpected error finding statements to update', { accountId, referenceDate, error });
      return [];
    }
  }
}
