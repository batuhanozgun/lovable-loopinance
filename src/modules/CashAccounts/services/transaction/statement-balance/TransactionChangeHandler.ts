
import { serviceLogger } from '../../../logging';
import { StatementBalanceCalculator } from './StatementBalanceCalculator';
import { CascadeBalanceProcessor } from './CascadeBalanceProcessor';

/**
 * İşlem değişikliği etkisi yönetim servisi
 */
export class TransactionChangeHandler {
  private static logger = serviceLogger;

  /**
   * İşlem değişikliğinin etkisini değerlendirerek bakiye güncellemelerini tetikler
   * Bu fonksiyon, bir işlem eklendiğinde, güncellendiğinde veya silindiğinde çağrılmalıdır
   */
  static async handleTransactionChange(statementId: string, accountId: string, isClosedStatement: boolean = false): Promise<void> {
    try {
      this.logger.debug('Handling transaction change effect', { statementId, accountId, isClosedStatement });
      
      // Önce mevcut ekstrenin bakiyesini güncelle
      await StatementBalanceCalculator.updateStatementBalance(statementId);
      
      // Eğer kapalı bir ekstre ise, sonraki tüm ekstrelerin bakiyelerini güncelle
      if (isClosedStatement) {
        await CascadeBalanceProcessor.cascadeBalanceUpdates(accountId, statementId);
      }
      
      this.logger.info('Transaction change effect handled successfully', { 
        statementId, 
        accountId, 
        cascadePerformed: isClosedStatement 
      });
    } catch (error) {
      this.logger.error('Failed to handle transaction change effect', { statementId, accountId, error });
    }
  }
}
