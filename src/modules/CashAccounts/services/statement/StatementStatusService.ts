
import { AccountStatement, StatementStatus } from '../../types';
import { serviceLogger } from '../../logging';
import { StatementService } from './index';
import { format, isAfter, isBefore, isEqual } from 'date-fns';

/**
 * Ekstre durum yönetimi işlemleri için servis
 */
export class StatementStatusService {
  private static logger = serviceLogger;

  /**
   * Ekstreyi kapatır ve bir sonraki dönemi oluşturur
   */
  static async closeStatement(statementId: string): Promise<boolean> {
    try {
      this.logger.debug('Closing statement', { statementId });
      
      // Ekstreyi getir
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Statement not found', { statementId });
        return false;
      }
      
      const statement = statementResponse.data;
      
      // Ekstre zaten kapalı mı?
      if (statement.status === StatementStatus.CLOSED) {
        this.logger.warn('Statement is already closed', { statementId });
        return true;
      }
      
      // Ekstreyi kapat
      const updateResponse = await StatementService.updateStatementStatus(
        statementId, 
        StatementStatus.CLOSED
      );
      
      if (!updateResponse.success) {
        this.logger.error('Failed to close statement', { 
          statementId, 
          error: updateResponse.error 
        });
        return false;
      }
      
      this.logger.info('Statement closed successfully', { statementId });
      return true;
    } catch (error) {
      this.logger.error('Unexpected error closing statement', { statementId, error });
      return false;
    }
  }

  /**
   * Belirli bir tarihin hangi ekstre dönemine denk geldiğini bulur
   */
  static async findStatementForDate(accountId: string, date: Date): Promise<AccountStatement | null> {
    try {
      this.logger.debug('Finding statement for date', { 
        accountId, 
        date: format(date, 'yyyy-MM-dd') 
      });
      
      // Hesaba ait tüm ekstreleri getir
      const statementsResponse = await StatementService.getStatementsByAccountId(accountId);
      if (!statementsResponse.success || !statementsResponse.data) {
        this.logger.error('Failed to fetch statements', { 
          accountId, 
          error: statementsResponse.error 
        });
        return null;
      }
      
      const statements = statementsResponse.data;
      
      // Tarihe uygun ekstreyi bul
      for (const statement of statements) {
        const startDate = new Date(statement.start_date);
        const endDate = new Date(statement.end_date);
        
        // Tarih bu ekstre döneminde mi?
        if (
          (isAfter(date, startDate) || isEqual(date, startDate)) && 
          (isBefore(date, endDate) || isEqual(date, endDate))
        ) {
          this.logger.info('Found statement for date', { 
            statementId: statement.id,
            date: format(date, 'yyyy-MM-dd')
          });
          return statement;
        }
      }
      
      this.logger.warn('No statement found for date', { 
        accountId, 
        date: format(date, 'yyyy-MM-dd') 
      });
      return null;
    } catch (error) {
      this.logger.error('Unexpected error finding statement for date', { 
        accountId, 
        date: format(date, 'yyyy-MM-dd'),
        error 
      });
      return null;
    }
  }

  /**
   * Ekstre durumunun geçerli olup olmadığını kontrol eder
   */
  static validateStatusTransition(
    currentStatus: StatementStatus, 
    newStatus: StatementStatus
  ): boolean {
    // Geçerli durum geçişleri
    const validTransitions: Record<StatementStatus, StatementStatus[]> = {
      [StatementStatus.OPEN]: [StatementStatus.CLOSED, StatementStatus.PENDING],
      [StatementStatus.PENDING]: [StatementStatus.OPEN, StatementStatus.CLOSED],
      [StatementStatus.CLOSED]: [] // Kapalı durum değiştirilemez
    };
    
    const isValid = validTransitions[currentStatus].includes(newStatus);
    
    if (!isValid) {
      this.logger.warn('Invalid status transition', { 
        from: currentStatus, 
        to: newStatus 
      });
    }
    
    return isValid;
  }
}
