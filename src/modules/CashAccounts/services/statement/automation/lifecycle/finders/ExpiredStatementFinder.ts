
/**
 * Süresi dolmuş ekstreleri bulan servis
 */
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../../logging';
import { AccountStatement, StatementStatus } from '../../../../../types';

export class ExpiredStatementFinder {
  private logger: ILogger;

  constructor(logger: ILogger = serviceLogger) {
    this.logger = logger;
  }

  /**
   * Bitiş tarihi geçmiş açık ekstreleri bulur
   */
  async findExpiredStatements(referenceDate: Date = new Date()): Promise<AccountStatement[] | null> {
    try {
      this.logger.debug('Süresi dolmuş ekstreleri arama işlemi başlatıldı');
      
      // Verilen tarihi formatla
      const dateStr = format(referenceDate, 'yyyy-MM-dd');
      
      // Bitiş tarihi geçmiş açık ekstreleri bul
      const { data: expiredStatements, error } = await supabase
        .from('account_statements')
        .select('*, cash_accounts(*)')
        .eq('status', 'open')
        .lt('end_date', dateStr);
      
      if (error) {
        this.logger.error('Süresi geçmiş ekstreleri bulurken hata', { error });
        return null;
      }
      
      if (!expiredStatements || expiredStatements.length === 0) {
        this.logger.info('Kapatılacak süresi geçmiş ekstre bulunamadı');
        return [];
      }
      
      this.logger.info(`${expiredStatements.length} adet süresi geçmiş ekstre bulundu`);
      return expiredStatements as AccountStatement[];
    } catch (error) {
      this.logger.error('Süresi geçmiş ekstreleri arama sırasında beklenmeyen hata', { error });
      return null;
    }
  }
}
