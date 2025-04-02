
/**
 * Hesap dönem hesaplama servisi
 */
import { addMonths, format, addDays } from 'date-fns';
import { CashAccount } from '../../../../../cashAccountHomepage/types';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { ClosingDateCalculator } from './ClosingDateCalculator';
import { SpecificDayCalculator } from './SpecificDayCalculator';

/**
 * Hesap dönem hesaplama servisi
 */
export class PeriodCalculator {
  private static logger = new ModuleLogger('CashAccountsNew.PeriodCalculator');

  /**
   * Dönem başlangıç tarihini hesaplar
   */
  static calculateStartDate(
    account: CashAccount,
    currentDate: Date,
    previousClosingDate: Date | null = null
  ): Date {
    if (!previousClosingDate) {
      if (account.closing_day_type === 'specificDay' && account.closing_day_value) {
        return SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, account.closing_day_value);
      }

      // İlk dönem için, bugünün ayının başlangıcını al
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    
    // Önceki dönem kapanış tarihinden sonraki gün
    return addDays(previousClosingDate, 1);
  }

  /**
   * Bir sonraki dönem için başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    try {
      this.logger.debug('Hesap için sonraki dönem hesaplanıyor', { 
        accountId: account.id, 
        closingDayType: account.closing_day_type,
        closingDayValue: account.closing_day_value,
        currentDate: format(currentDate, 'yyyy-MM-dd')
      });

      // Dönem bitiş tarihi hesaplama
      const closingDate = ClosingDateCalculator.calculateClosingDate(account, currentDate);
      
      // Dönem başlangıç tarihi, bir önceki dönemin bitiş tarihinin ertesi günü
      // veya ilk dönem için bugünün ayının başlangıcı
      const previousPeriodEndDate = ClosingDateCalculator.calculatePreviousMonthClosingDate(account, currentDate);
      const startDate = this.calculateStartDate(account, currentDate, previousPeriodEndDate);
      
      this.logger.info('Hesap için sonraki dönem hesaplandı', { 
        accountId: account.id, 
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(closingDate, 'yyyy-MM-dd')
      });
      
      return {
        startDate,
        endDate: closingDate
      };
    } catch (error) {
      this.logger.error('Dönem hesaplama hatası', { accountId: account.id, error });
      throw error;
    }
  }

  /**
   * Bir sonraki ayın dönem başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextMonthPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    const nextMonth = addMonths(currentDate, 1);
    return this.calculateNextPeriod(account, nextMonth);
  }

  /**
   * Şu anki tarih için hesap dönemini hesaplar
   */
  static calculateCurrentPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    // Özellikle specificDay seçeneği için özel hesaplama
    if (account.closing_day_type === 'specificDay' && account.closing_day_value) {
      const currentDay = currentDate.getDate();
      const closingDay = account.closing_day_value;
      
      // Eğer bugünün günü kapanış gününden küçükse
      if (currentDay < closingDay) {
        const startDate = SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, closingDay);
        const endDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, closingDay);
        
        this.logger.debug('Özel gün seçeneği için aktif dönem hesaplandı (bugün < kapanış günü)', {
          currentDay,
          closingDay,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd')
        });
        
        return { startDate, endDate };
      } 
      // Eğer bugünün günü kapanış gününe eşit veya büyükse
      else {
        const startDate = SpecificDayCalculator.calculateSpecificDayStartDate(currentDate, closingDay);
        const endDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, closingDay);
        
        this.logger.debug('Özel gün seçeneği için aktif dönem hesaplandı (bugün >= kapanış günü)', {
          currentDay,
          closingDay,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd')
        });
        
        return { startDate, endDate };
      }
    }
    
    // Diğer seçenekler için standart hesaplama
    const nextPeriod = this.calculateNextPeriod(account, currentDate);
    
    // Eğer mevcut tarih bir sonraki dönemin başlangıç tarihinden önceyse,
    // önceki dönemi hesapla
    if (currentDate < nextPeriod.startDate) {
      const previousPeriodEndDate = new Date(nextPeriod.startDate);
      previousPeriodEndDate.setDate(previousPeriodEndDate.getDate() - 1);
      
      // Önceki dönemin başlangıç tarihini hesapla
      const previousPeriodStartDate = new Date(
        ClosingDateCalculator.calculatePreviousMonthClosingDate(account, previousPeriodEndDate)
      );
      previousPeriodStartDate.setDate(previousPeriodStartDate.getDate() + 1);
      
      return {
        startDate: previousPeriodStartDate,
        endDate: previousPeriodEndDate
      };
    }
    
    // Eğer mevcut tarih bir sonraki dönemin içindeyse, onu döndür
    return nextPeriod;
  }
}
