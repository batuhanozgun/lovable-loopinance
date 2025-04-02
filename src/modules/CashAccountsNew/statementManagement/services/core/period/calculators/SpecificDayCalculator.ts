
/**
 * Belirli gün hesaplamaları için yardımcı servis
 */
import { getDaysInMonth, isWeekend, subDays } from 'date-fns';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';

/**
 * Belirli gün hesaplamaları için yardımcı sınıf
 */
export class SpecificDayCalculator {
  private static logger = new ModuleLogger('CashAccountsNew.SpecificDayCalculator');

  /**
   * Belirli bir günün tarihini döndürür, eğer gün ay içinde yoksa ayın son gününü döndürür
   */
  static getSpecificDayDate(year: number, month: number, day: number): Date {
    this.logger.debug('Belirli gün hesaplanıyor', { year, month, day });
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const specificDay = Math.min(day, daysInMonth);
    return new Date(year, month, specificDay);
  }

  /**
   * Ayın son iş gününü hesaplar (hafta sonlarını dikkate alır)
   */
  static getLastBusinessDay(lastDayOfMonth: Date): Date {
    let lastBusinessDay = new Date(lastDayOfMonth);
    
    // Eğer son gün hafta sonuysa, önceki iş gününü bul
    while (isWeekend(lastBusinessDay)) {
      lastBusinessDay = subDays(lastBusinessDay, 1);
    }
    
    return lastBusinessDay;
  }
}
