
/**
 * Hesap kapanış tarihi hesaplama servisi
 */
import { endOfMonth, addMonths } from 'date-fns';
import { CashAccount } from '../../../../../cashAccountHomepage/types';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SpecificDayCalculator } from './SpecificDayCalculator';

/**
 * Hesap kapanış tarihi hesaplama servisi
 */
export class ClosingDateCalculator {
  private static logger = new ModuleLogger('CashAccountsNew.ClosingDateCalculator');

  /**
   * Kapanış tarihini hesaplar
   */
  static calculateClosingDate(
    account: CashAccount,
    currentDate: Date
  ): Date {
    this.logger.debug('Kapanış tarihi hesaplanıyor', {
      accountId: account.id,
      closingDayType: account.closing_day_type,
      date: currentDate
    });

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Mevcut ayın son günü
    const currentMonthEndDate = endOfMonth(currentDate);
    
    let closingDate: Date;
    
    switch (account.closing_day_type) {
      case 'lastDay':
        closingDate = currentMonthEndDate;
        break;
        
      case 'lastBusinessDay':
        closingDate = SpecificDayCalculator.getLastBusinessDay(currentMonthEndDate);
        break;
        
      case 'specificDay':
        if (!account.closing_day_value) {
          throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
        }
        
        closingDate = SpecificDayCalculator.calculateSpecificDayEndDate(currentDate, account.closing_day_value);
        break;
        
      default:
        closingDate = currentMonthEndDate;
        break;
    }
    
    return closingDate;
  }

  /**
   * Önceki ayın kapanış tarihini hesaplar
   */
  static calculatePreviousMonthClosingDate(
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
        closingDate = SpecificDayCalculator.getLastBusinessDay(previousMonthEndDate);
        break;
        
      case 'specificDay':
        if (!account.closing_day_value) {
          throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
        }
        
        closingDate = SpecificDayCalculator.getPreviousMonthClosingDate(currentDate, account.closing_day_value);
        break;
        
      default:
        closingDate = previousMonthEndDate;
        break;
    }
    
    return closingDate;
  }
}
