
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
      // Düzeltilmiş tarih formatı (local vs. ISO farklarını elimine etmek için)
      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1; // JavaScript'te ay 0-11 arası
      const selectedDay = date.getDate();
      
      // YYYY-MM-DD formatında tarih oluştur
      const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      
      console.log('======== STATEMENT FINDER LOGS ========');
      console.log('Input date object:', date);
      console.log('Input date toString:', date.toString());
      console.log('Input date toISOString:', date.toISOString());
      console.log('Input date formatted (YYYY-MM-DD):', formattedDate);
      console.log('For account:', accountId);
      
      // Query oluştur ve logla
      console.log('Executing Supabase query with parameters:');
      console.log('  - account_id =', accountId);
      console.log('  - start_date <=', formattedDate);
      console.log('  - end_date >=', formattedDate);
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .lte('start_date', formattedDate) // Başlangıç tarihi seçilen tarihten önce veya eşit
        .gte('end_date', formattedDate)   // Bitiş tarihi seçilen tarihten sonra veya eşit
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Query failed with error:', error);
        return null;
      }
      
      console.log('Query returned', statements?.length || 0, 'statements');
      console.log('Raw statements data:', JSON.stringify(statements, null, 2));
      
      // Bulunan tüm ekstreleri detaylı kontrol et
      if (statements && statements.length > 0) {
        console.log('Statements found, checking for exact matches...');
        
        // JavaScript Date nesneleri ile tam karşılaştırma
        for (const statement of statements) {
          // Formatted dates for consistent comparison
          const stStartFormatted = statement.start_date;
          const stEndFormatted = statement.end_date;
          
          console.log('Checking statement:', statement.id);
          console.log('  - Period:', stStartFormatted, 'to', stEndFormatted);
          console.log('  - Status:', statement.status);
          console.log('  - Is selected date within range?', 
            formattedDate >= stStartFormatted && formattedDate <= stEndFormatted ? 'YES' : 'NO');
          
          if (formattedDate >= stStartFormatted && formattedDate <= stEndFormatted) {
            console.log('MATCH FOUND! Exact period match for date', formattedDate);
            return statement;
          }
        }
        
        // Eğer tam olarak uyuşan yoksa
        console.log('No exact statement match, returning first result:', statements[0]);
        return statements[0];
      }
      
      console.warn(`No statement found for date ${formattedDate} in account ${accountId}`);
      console.log('======== END STATEMENT FINDER LOGS ========');
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
