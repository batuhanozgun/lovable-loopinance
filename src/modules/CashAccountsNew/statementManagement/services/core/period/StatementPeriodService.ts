
/**
 * Ekstre dönem hesaplama işlemleri için servis
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount } from '../../../../cashAccountHomepage/types';
import { format, addMonths, endOfMonth, getDaysInMonth, isWeekend, subDays } from 'date-fns';

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
    try {
      this.logger.debug('Hesap için sonraki dönem hesaplanıyor', { 
        accountId: account.id, 
        closingDayType: account.closing_day_type 
      });

      // Mevcut ayın son günü
      const currentMonthEndDate = endOfMonth(currentDate);
      
      // Bir sonraki ay
      const nextMonth = addMonths(currentDate, 1);
      
      // Dönem bitiş tarihi hesaplama
      let closingDate: Date;
      
      switch (account.closing_day_type) {
        case 'lastDay':
          closingDate = currentMonthEndDate;
          break;
          
        case 'lastBusinessDay':
          closingDate = this.getLastBusinessDay(currentMonthEndDate);
          break;
          
        case 'specificDay':
          if (!account.closing_day_value) {
            throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
          }
          
          closingDate = this.getSpecificDayDate(
            currentDate.getFullYear(), 
            currentDate.getMonth(), 
            account.closing_day_value
          );
          break;
          
        default:
          closingDate = currentMonthEndDate;
          break;
      }
      
      // Eğer mevcut tarih dönem bitiş tarihini geçmişse, bir sonraki ayın dönemini hesapla
      if (currentDate > closingDate) {
        return this.calculateNextPeriod(account, nextMonth);
      }
      
      // Dönem başlangıç tarihi, bir önceki dönemin bitiş tarihinin ertesi günü
      // veya ilk dönem için bugün
      const previousPeriodEndDate = this.calculatePreviousPeriodEndDate(account, currentDate);
      const startDate = new Date(previousPeriodEndDate);
      startDate.setDate(previousPeriodEndDate.getDate() + 1);
      
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
   * Önceki dönemin bitiş tarihini hesaplar
   */
  private static calculatePreviousPeriodEndDate(
    account: CashAccount,
    currentDate: Date
  ): Date {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Bir önceki ay
    const previousMonth = new Date(currentYear, currentMonth - 1);
    const previousMonthYear = previousMonth.getFullYear();
    const previousMonthMonth = previousMonth.getMonth();
    
    // Önceki ayın son günü
    const previousMonthEndDate = endOfMonth(previousMonth);
    
    // Dönem bitiş tarihi hesaplama
    let closingDate: Date;
    
    switch (account.closing_day_type) {
      case 'lastDay':
        closingDate = previousMonthEndDate;
        break;
        
      case 'lastBusinessDay':
        closingDate = this.getLastBusinessDay(previousMonthEndDate);
        break;
        
      case 'specificDay':
        if (!account.closing_day_value) {
          throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
        }
        
        closingDate = this.getSpecificDayDate(
          previousMonthYear, 
          previousMonthMonth, 
          account.closing_day_value
        );
        break;
        
      default:
        closingDate = previousMonthEndDate;
        break;
    }
    
    return closingDate;
  }

  /**
   * Belirli bir günün tarihini döndürür, eğer gün ay içinde yoksa ayın son gününü döndürür
   */
  private static getSpecificDayDate(year: number, month: number, day: number): Date {
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const specificDay = Math.min(day, daysInMonth);
    return new Date(year, month, specificDay);
  }

  /**
   * Ayın son iş gününü hesaplar (hafta sonlarını dikkate alır)
   */
  private static getLastBusinessDay(lastDayOfMonth: Date): Date {
    let lastBusinessDay = new Date(lastDayOfMonth);
    
    // Eğer son gün hafta sonuysa, önceki iş gününü bul
    while (isWeekend(lastBusinessDay)) {
      lastBusinessDay = subDays(lastBusinessDay, 1);
    }
    
    return lastBusinessDay;
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
      const previousPeriodStartDate = this.calculatePreviousPeriodEndDate(account, previousPeriodEndDate);
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
