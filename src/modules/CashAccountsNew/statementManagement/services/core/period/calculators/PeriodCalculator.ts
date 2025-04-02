
/**
 * Hesap dönem hesaplama servisi
 */
import { addMonths, format } from 'date-fns';
import { CashAccount } from '../../../../../cashAccountHomepage/types';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { ClosingDateCalculator } from './ClosingDateCalculator';

/**
 * Hesap dönem hesaplama servisi
 */
export class PeriodCalculator {
  private static logger = new ModuleLogger('CashAccountsNew.PeriodCalculator');

  /**
   * Dönem başlangıç tarihini hesaplar
   */
  static calculateStartDate(
    previousClosingDate: Date | null
  ): Date {
    if (!previousClosingDate) {
      // İlk dönem için, bugünün ayının başlangıcını al
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    // Önceki dönem kapanış tarihinden sonraki gün
    const nextDay = new Date(previousClosingDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
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
        closingDayType: account.closing_day_type 
      });

      // Dönem bitiş tarihi hesaplama
      const closingDate = ClosingDateCalculator.calculateClosingDate(account, currentDate);
      
      // Dönem başlangıç tarihi, bir önceki dönemin bitiş tarihinin ertesi günü
      // veya ilk dönem için bugün
      const previousPeriodEndDate = ClosingDateCalculator.calculatePreviousMonthClosingDate(account, currentDate);
      const startDate = this.calculateStartDate(previousPeriodEndDate);
      
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
    // Bir sonraki dönemi hesapla
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
