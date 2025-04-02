
/**
 * Belirli gün hesaplamaları için yardımcı servis
 */
import { getDaysInMonth, isWeekend, subDays, addDays } from 'date-fns';
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

  /**
   * Belirli gün için bir önceki ayın kapanış tarihini hesaplar
   */
  static getPreviousMonthClosingDate(currentDate: Date, closingDay: number): Date {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    // Eğer bugünün günü kapanış gününe eşit veya büyükse, bu ayki kapanış mevcut tarihte gerçekleşir
    // Bu durumda önceki ayın kapanış tarihi önceki aydadır
    if (currentDay >= closingDay) {
      return this.getSpecificDayDate(currentYear, currentMonth - 1, closingDay);
    } 
    // Eğer bugünün günü kapanış gününden küçükse, önceki kapanış bu ayda olmuştur
    else {
      return this.getSpecificDayDate(currentYear, currentMonth, closingDay);
    }
  }

  /**
   * Belirli gün için bir sonraki ayın kapanış tarihini hesaplar
   */
  static getNextMonthClosingDate(currentDate: Date, closingDay: number): Date {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    // Eğer bugünün günü kapanış gününe eşit veya büyükse, sonraki kapanış bir sonraki ayda olur
    if (currentDay >= closingDay) {
      return this.getSpecificDayDate(currentYear, currentMonth + 1, closingDay);
    } 
    // Eğer bugünün günü kapanış gününden küçükse, sonraki kapanış bu ayda olur
    else {
      return this.getSpecificDayDate(currentYear, currentMonth, closingDay);
    }
  }

  /**
   * Belirli gün için dönemin başlangıç tarihini hesaplar
   */
  static calculateSpecificDayStartDate(currentDate: Date, closingDay: number): Date {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    // Eğer bugünün günü kapanış gününden küçükse, bu ay içindeki bir önceki kapanış tarihinden sonraki gün başlangıçtır
    if (currentDay < closingDay) {
      // Önceki ayın kapanış tarihine 1 gün ekle
      const previousClosingDate = this.getPreviousMonthClosingDate(currentDate, closingDay);
      return addDays(previousClosingDate, 1);
    } 
    // Eğer bugünün günü kapanış gününe eşit veya büyükse, bu ayki kapanış tarihinden sonraki gün başlangıçtır
    else {
      // Bu ayki kapanış tarihine 1 gün ekle
      const thisMonthClosingDate = this.getSpecificDayDate(currentYear, currentMonth, closingDay);
      return addDays(thisMonthClosingDate, 1);
    }
  }

  /**
   * Belirli gün için dönemin bitiş tarihini hesaplar
   */
  static calculateSpecificDayEndDate(currentDate: Date, closingDay: number): Date {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    // Eğer bugünün günü kapanış gününden küçükse, bu ayki kapanış tarihi bitiş tarihidir
    if (currentDay < closingDay) {
      return this.getSpecificDayDate(currentYear, currentMonth, closingDay);
    } 
    // Eğer bugünün günü kapanış gününe eşit veya büyükse, sonraki aydaki kapanış tarihi bitiş tarihidir
    else {
      return this.getSpecificDayDate(currentYear, currentMonth + 1, closingDay);
    }
  }
}
