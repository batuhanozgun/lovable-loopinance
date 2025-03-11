
/**
 * Ekstre doğrulama servisi
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { CashAccount } from '../../../../types';

export class StatementValidationService {
  private logger: ILogger;

  constructor(logger: ILogger = serviceLogger) {
    this.logger = logger;
  }

  /**
   * Hesap bilgilerinin geçerliliğini kontrol eder
   */
  validateAccount(account: CashAccount | null | undefined): boolean {
    if (!account) {
      this.logger.error('Ekstre işlemi için geçerli hesap bilgisi bulunamadı');
      return false;
    }

    if (!account.id) {
      this.logger.error('Ekstre işlemi için hesap ID bilgisi bulunamadı');
      return false;
    }

    if (!account.is_active) {
      this.logger.error('Ekstre işlemi için hesap aktif değil', { accountId: account.id });
      return false;
    }

    if (!account.closing_day_type) {
      this.logger.error('Ekstre işlemi için hesap dönem tipi bilgisi bulunamadı', { accountId: account.id });
      return false;
    }

    return true;
  }

  /**
   * Dönem tarihlerinin geçerliliğini kontrol eder
   */
  validatePeriodDates(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) {
      this.logger.error('Ekstre dönem tarihleri geçersiz', { startDate, endDate });
      return false;
    }

    if (startDate > endDate) {
      this.logger.error('Ekstre başlangıç tarihi bitiş tarihinden sonra olamaz', { 
        startDate, 
        endDate 
      });
      return false;
    }

    return true;
  }
}
