
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
      
      // Düzeltilmiş tarih karşılaştırma mantığı:
      // 1. Başlangıç tarihi (start_date), seçilen tarihten küçük veya eşit olmalı (<=)
      // 2. Bitiş tarihi (end_date), seçilen tarihten büyük veya eşit olmalı (>=)
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .lte('start_date', formattedDate) // Başlangıç tarihi seçilen tarihten önce veya eşit
        .gte('end_date', formattedDate)   // Bitiş tarihi seçilen tarihten sonra veya eşit
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Failed to find statement for date:', error);
        return null;
      }
      
      // Bulunan tüm ekstreleri kontrol ediyoruz
      if (statements && statements.length > 0) {
        // Seçilen tarihin tam olarak içinde olduğu ekstreyi buluyoruz
        for (const statement of statements) {
          const startDate = new Date(statement.start_date);
          const endDate = new Date(statement.end_date);
          const selectedDate = new Date(formattedDate);
          
          if (selectedDate >= startDate && selectedDate <= endDate) {
            console.log('Found statement for date:', statement);
            return statement;
          }
        }
        
        // Eğer tam olarak uyuşan yoksa, ilk bulunan sonucu döndürüyoruz
        console.log('No exact statement match, returning first result:', statements[0]);
        return statements[0];
      }
      
      console.warn(`No statement found for date ${formattedDate} in account ${accountId}`);
      return null;
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
