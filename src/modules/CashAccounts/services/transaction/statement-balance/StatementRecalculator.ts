
import { supabase } from '@/integrations/supabase/client';
import { serviceLogger } from '../../../logging';
import { StatementService } from '../../statement';
import { StatementBalanceCalculator } from './StatementBalanceCalculator';
import { StatementStartBalanceUpdater } from './StatementStartBalanceUpdater';

/**
 * Ekstre yeniden hesaplama servisi
 */
export class StatementRecalculator {
  private static logger = serviceLogger;

  /**
   * Hesabın tüm ekstrelerini sırayla yeniden hesaplar
   */
  static async recalculateAllStatements(accountId: string): Promise<void> {
    try {
      this.logger.debug('Starting complete account statements recalculation', { accountId });
      
      // Hesabın tüm ekstrelerini tarih sırasına göre al
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .order('start_date', { ascending: true });
      
      if (error || !statements || statements.length === 0) {
        this.logger.error('Failed to fetch statements for recalculation', { accountId, error });
        return;
      }
      
      this.logger.info(`Found ${statements.length} statements to recalculate`, { accountId });
      
      // Hesabın başlangıç bakiyesini al
      const { data: account, error: accountError } = await supabase
        .from('cash_accounts')
        .select('initial_balance')
        .eq('id', accountId)
        .single();
      
      if (accountError || !account) {
        this.logger.error('Failed to fetch account for recalculation', { accountId, error: accountError });
        return;
      }
      
      // İlk ekstrenin başlangıç bakiyesini hesabın başlangıç bakiyesi olarak ayarla
      let previousEndBalance = Number(account.initial_balance);
      
      // Her bir ekstre için:
      for (const statement of statements) {
        // 1. Başlangıç bakiyesini, önceki ekstrenin bitiş bakiyesi olarak ayarla
        //    (ilk ekstre için hesabın başlangıç bakiyesi)
        await StatementStartBalanceUpdater.updateStatementStartBalance(statement.id, previousEndBalance);
        
        // 2. Ekstrenin gelir, gider ve bitiş bakiyesini yeniden hesapla
        await StatementBalanceCalculator.updateStatementBalance(statement.id);
        
        // 3. Bir sonraki ekstre için bu ekstrenin bitiş bakiyesini not al
        const updatedStatement = await StatementService.getStatementById(statement.id);
        if (updatedStatement.success && updatedStatement.data) {
          previousEndBalance = Number(updatedStatement.data.end_balance);
        }
      }
      
      this.logger.info('Complete account statements recalculation finished', { accountId });
    } catch (error) {
      this.logger.error('Unexpected error during complete recalculation', { accountId, error });
    }
  }
}
