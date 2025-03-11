
import { ClosingDayType } from '../../types';
import { serviceLogger } from '../../logging';
import { getLastDayOfMonth, getLastBusinessDayOfMonth, getSpecificDayOfMonth } from '../../utils/closingDayUtils';
import { format, addMonths, isAfter, isBefore, isSameDay } from 'date-fns';

/**
 * Ekstre periyodu hesaplama işlemleri için servis
 */
export class StatementPeriodService {
  private static logger = serviceLogger;

  /**
   * Hesap kesim günü türüne göre kapanış tarihini hesaplar
   */
  static calculateClosingDate(
    year: number,
    month: number,
    closingDayType: ClosingDayType,
    closingDayValue?: number
  ): Date {
    this.logger.debug('Calculating closing date', { year, month, closingDayType, closingDayValue });
    
    switch (closingDayType) {
      case ClosingDayType.LAST_DAY:
        return new Date(year, month + 1, 0);
        
      case ClosingDayType.LAST_BUSINESS_DAY:
        return getLastBusinessDayOfMonth(year, month);
        
      case ClosingDayType.SPECIFIC_DAY:
        if (!closingDayValue) {
          this.logger.error('Closing day value is required for SPECIFIC_DAY type');
          throw new Error('Closing day value is required for SPECIFIC_DAY type');
        }
        return getSpecificDayOfMonth(year, month, closingDayValue);
        
      default:
        this.logger.warn('Unknown closing day type, using LAST_DAY as default', { closingDayType });
        return new Date(year, month + 1, 0);
    }
  }

  /**
   * Verilen tarih için bir sonraki dönem kapanış tarihini hesaplar
   */
  static calculateNextClosingDate(
    currentDate: Date,
    closingDayType: ClosingDayType,
    closingDayValue?: number
  ): Date {
    const nextMonth = currentDate.getMonth() + 1;
    const year = nextMonth === 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const month = nextMonth % 12;
    
    return this.calculateClosingDate(year, month, closingDayType, closingDayValue);
  }

  /**
   * Ekstre başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateStatementPeriod(
    referenceDate: Date,
    closingDayType: ClosingDayType,
    closingDayValue?: number
  ): { startDate: Date; endDate: Date } {
    const currentMonth = referenceDate.getMonth();
    const currentYear = referenceDate.getFullYear();
    
    // Geçerli ayın kapanış tarihi
    const currentClosingDate = this.calculateClosingDate(
      currentYear,
      currentMonth,
      closingDayType,
      closingDayValue
    );
    
    // Bir önceki ayın kapanış tarihi
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = prevMonth === 11 ? currentYear - 1 : currentYear;
    const previousClosingDate = this.calculateClosingDate(
      prevYear,
      prevMonth,
      closingDayType,
      closingDayValue
    );
    
    // Referans tarih geçerli ayın kapanış tarihinden sonra mı?
    if (isAfter(referenceDate, currentClosingDate) || isSameDay(referenceDate, currentClosingDate)) {
      // Yeni dönem oluşturulmalı: geçerli kapanış tarihi + 1 gün ile bir sonraki kapanış tarihi
      const startDate = new Date(currentClosingDate);
      startDate.setDate(startDate.getDate() + 1);
      
      const nextClosingDate = this.calculateNextClosingDate(
        currentClosingDate,
        closingDayType,
        closingDayValue
      );
      
      return {
        startDate,
        endDate: nextClosingDate
      };
    } else {
      // Geçerli dönem: önceki kapanış tarihi + 1 gün ile geçerli kapanış tarihi
      const startDate = new Date(previousClosingDate);
      startDate.setDate(startDate.getDate() + 1);
      
      return {
        startDate,
        endDate: currentClosingDate
      };
    }
  }

  /**
   * Tarih aralığının geçerli olup olmadığını kontrol eder
   */
  static validatePeriod(startDate: Date, endDate: Date): boolean {
    if (isBefore(endDate, startDate)) {
      this.logger.error('Invalid period: end date is before start date', {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd')
      });
      return false;
    }
    
    if (isSameDay(startDate, endDate)) {
      this.logger.warn('Period start and end dates are the same day', {
        date: format(startDate, 'yyyy-MM-dd')
      });
    }
    
    return true;
  }

  /**
   * Bir sonraki dönem için başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextPeriod(
    currentEndDate: Date,
    closingDayType: ClosingDayType,
    closingDayValue?: number
  ): { startDate: Date; endDate: Date } {
    // Başlangıç tarihi, geçerli dönemin bitiş tarihinin ertesi günü
    const startDate = new Date(currentEndDate);
    startDate.setDate(startDate.getDate() + 1);
    
    // Bir sonraki dönemin bitiş tarihi
    const nextMonth = startDate.getMonth();
    const nextYear = startDate.getFullYear();
    
    const endDate = this.calculateClosingDate(
      nextYear,
      nextMonth,
      closingDayType,
      closingDayValue
    );
    
    return { startDate, endDate };
  }
}
