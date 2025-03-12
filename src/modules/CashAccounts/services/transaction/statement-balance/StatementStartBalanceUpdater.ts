
import { supabase } from '@/integrations/supabase/client';
import { serviceLogger } from '../../../logging';
import { StatementService } from '../../statement';

/**
 * Ekstre başlangıç bakiyesi güncelleme servisi
 */
export class StatementStartBalanceUpdater {
  private static logger = serviceLogger;

  /**
   * Bir ekstre bakiyesi değiştiğinde, sonraki ekstreye yeni başlangıç bakiyesi atar
   */
  static async updateStatementStartBalance(statementId: string, newStartBalance: number): Promise<void> {
    try {
      this.logger.debug('Updating statement start balance', { statementId, newStartBalance });
      
      // Ekstrenin mevcut bilgilerini al
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Failed to fetch statement for start balance update', { statementId });
        return;
      }
      
      const statement = statementResponse.data;
      
      // Başlangıç bakiyesi zaten aynıysa, işlemi atla
      if (Number(statement.start_balance) === Number(newStartBalance)) {
        this.logger.debug('Statement start balance already up to date', { statementId, newStartBalance });
        return;
      }
      
      // Başlangıç bakiyesi değişikliği ile bitiş bakiyesini yeniden hesapla
      const endBalanceDiff = Number(newStartBalance) - Number(statement.start_balance);
      const newEndBalance = Number(statement.end_balance) + endBalanceDiff;
      
      // Ekstre bakiyelerini güncelle - ama sadece başlangıç bakiyesi ve bitiş bakiyesini
      // Gelir ve gider tutarları aynı kalacak
      await supabase
        .from('account_statements')
        .update({ 
          start_balance: newStartBalance,
          end_balance: newEndBalance
        })
        .eq('id', statementId);
      
      this.logger.info('Statement start balance updated successfully', { 
        statementId, 
        oldStartBalance: statement.start_balance,
        newStartBalance: newStartBalance,
        oldEndBalance: statement.end_balance,
        newEndBalance: newEndBalance
      });
    } catch (error) {
      this.logger.error('Unexpected error updating statement start balance', { statementId, newStartBalance, error });
    }
  }
}
