
/**
 * Ekstre dönem hesaplama işlemleri için servis
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount } from '../../../../cashAccountHomepage/types';
import { format } from 'date-fns';
import { PeriodCalculator, ClosingDateCalculator, SpecificDayCalculator } from './calculators';

/**
 * Ekstre dönem hesaplama servisi
 */
export class StatementPeriodService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementPeriodService');

  /**
   * Bir sonraki dönem için başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    this.logger.debug('calculateNextPeriod çağrıldı', {
      accountId: account.id,
      closingDayType: account.closing_day_type,
      closingDayValue: account.closing_day_value,
      currentDate: format(currentDate, 'yyyy-MM-dd')
    });
    
    // Özel gün seçeneği için özel hesaplama
    if (account.closing_day_type === 'specificDay' && account.closing_day_value) {
      const currentDay = currentDate.getDate();
      const closingDay = account.closing_day_value;
      
      let startDate: Date;
      let endDate: Date;
      
      // Bugünkü günün kapanış gününe göre durumunu kontrol et
      if (currentDay < closingDay) {
        // Bugün kapanış gününden küçükse, bu ay içindeki kapanış gününde dönem biter
        endDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, closingDay);
        
        // Başlangıç tarihi, bir önceki ayın kapanış gününden bir gün sonrasıdır
        startDate = SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, closingDay);
      } 
      else if (currentDay === closingDay) {
        // Bugün kapanış gününe eşitse, bugün dönem biter
        endDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, closingDay);
        
        // Başlangıç tarihi, bir önceki ayın kapanış gününden bir gün sonrasıdır
        startDate = SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, closingDay);
      }
      else {
        // Bugün kapanış gününden büyükse, bir sonraki aydaki kapanış gününde dönem biter
        endDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, closingDay);
        
        // Başlangıç tarihi, bu aydaki kapanış gününden bir gün sonrasıdır
        startDate = SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, closingDay);
      }
      
      this.logger.debug('Belirli gün seçeneği için dönem hesaplandı', {
        currentDay, 
        closingDay,
        startDate: format(startDate, 'yyyy-MM-dd'), 
        endDate: format(endDate, 'yyyy-MM-dd')
      });
      
      return { startDate, endDate };
    }
    
    // Diğer seçenekler için standart hesaplama
    return PeriodCalculator.calculateNextPeriod(account, currentDate);
  }

  /**
   * Bir sonraki ayın dönem başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextMonthPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    return PeriodCalculator.calculateNextMonthPeriod(account, currentDate);
  }

  /**
   * Şu anki tarih için hesap dönemini hesaplar
   */
  static calculateCurrentPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    return PeriodCalculator.calculateCurrentPeriod(account, currentDate);
  }
}
