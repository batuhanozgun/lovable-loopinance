
/**
 * Zincirleme ekstre güncellemeleri için servis
 * Bir işlem eklendiğinde/silindiğinde/güncellendiğinde, bu işlemle ilişkili ekstreden sonraki tüm ekstreleri günceller
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementBalanceCalculationService } from '../calculation/StatementBalanceCalculationService';

/**
 * Zincirleme ekstre güncellemeleri için servis
 */
export class StatementChainUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementChainUpdateService');

  /**
   * Bir ekstreden başlayarak tüm sonraki ekstreleri günceller
   * @param accountId Hesap ID
   * @param startStatementId Başlangıç ekstresi ID
   * @param balanceChange Bakiye değişim miktarı (+ gelir, - gider)
   */
  static async updateStatementChain(
    accountId: string,
    startStatementId: string,
    balanceChange: number
  ): Promise<boolean> {
    try {
      this.logger.debug('Invoking statement chain update', { 
        accountId, 
        startStatementId, 
        balanceChange 
      });

      // Yeni hesaplama servisini kullanarak güncelleme işlemini yap
      const result = await StatementBalanceCalculationService.updateStatementChain(
        accountId,
        startStatementId,
        balanceChange
      );
      
      if (result) {
        this.logger.info('Statement chain update completed successfully', {
          accountId,
          startStatementId
        });
      } else {
        this.logger.error('Statement chain update failed', {
          accountId,
          startStatementId
        });
      }
      
      return result;
    } catch (error) {
      this.logger.error('Unexpected error in statement chain update', { 
        accountId, 
        startStatementId, 
        error 
      });
      return false;
    }
  }
}
