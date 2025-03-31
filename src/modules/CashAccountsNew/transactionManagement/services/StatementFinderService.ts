
import { supabase } from '@/integrations/supabase/client';

/**
 * Açık ekstre bulma servisi
 */
export class StatementFinderService {
  /**
   * Belirli bir hesap için açık ekstreleri bulur
   */
  static async findOpenStatements(accountId: string): Promise<{id: string, start_date: string, end_date: string}[]> {
    try {
      console.log('Finding open statements for account:', accountId);
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('id, start_date, end_date')
        .eq('account_id', accountId)
        .eq('status', 'OPEN')
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Failed to find open statements:', error);
        return [];
      }
      
      return statements || [];
    } catch (error) {
      console.error('Unexpected error finding open statements:', error);
      return [];
    }
  }

  /**
   * Belirli bir tarih için uygun olan, açık durumda olan bir ekstre bulur
   */
  static async findStatementForDate(accountId: string, date: Date): Promise<string | null> {
    try {
      console.log('Finding statement for date:', date, 'in account:', accountId);
      
      const formattedDate = date.toISOString().split('T')[0];
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('id')
        .eq('account_id', accountId)
        .eq('status', 'OPEN')
        .lte('start_date', formattedDate)
        .gte('end_date', formattedDate)
        .maybeSingle();
      
      if (error) {
        console.error('Failed to find statement for date:', error);
        return null;
      }
      
      return statements?.id || null;
    } catch (error) {
      console.error('Unexpected error finding statement for date:', error);
      return null;
    }
  }
}
