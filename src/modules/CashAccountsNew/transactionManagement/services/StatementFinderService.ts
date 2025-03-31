
import { supabase } from '@/integrations/supabase/client';
import { AccountStatement } from '../../statementManagement/types';

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
   * Belirli bir tarih için uygun olan ekstreyi bulur
   * Seçilen tarih, ekstrenin başlangıç ve bitiş tarihleri arasında olmalıdır
   * Status koşulu olmadan tüm ekstreleri kontrol eder
   */
  static async findStatementForDate(accountId: string, date: Date): Promise<AccountStatement | null> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      console.log('Finding statement for date:', formattedDate, 'in account:', accountId);
      
      // Düzeltilmiş tarih karşılaştırma mantığı
      // Tarih ekstrenin başlangıç tarihine eşit veya büyük VE bitiş tarihine eşit veya küçük olmalı
      const { data: statement, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .lte('start_date', formattedDate) // Başlangıç tarihi seçilen tarihten önce veya eşit
        .gte('end_date', formattedDate)   // Bitiş tarihi seçilen tarihten sonra veya eşit
        .order('start_date', { ascending: false }) // En son ekstreyi seç
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('Failed to find statement for date:', error);
        return null;
      }
      
      // Bulunan ekstreyi kontrol et ve logla
      if (statement) {
        console.log('Found statement for date:', statement);
      } else {
        console.warn(`No statement found for date ${formattedDate} in account ${accountId}`);
      }
      
      return statement || null;
    } catch (error) {
      console.error('Unexpected error finding statement for date:', error);
      return null;
    }
  }

  /**
   * ID'ye göre belirli bir ekstreyi getir
   */
  static async getStatementById(statementId: string): Promise<AccountStatement | null> {
    try {
      console.log('Fetching statement by ID:', statementId);
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('id', statementId)
        .maybeSingle();
      
      if (error) {
        console.error('Failed to fetch statement by ID:', error);
        return null;
      }
      
      return statement || null;
    } catch (error) {
      console.error('Unexpected error fetching statement by ID:', error);
      return null;
    }
  }
}
