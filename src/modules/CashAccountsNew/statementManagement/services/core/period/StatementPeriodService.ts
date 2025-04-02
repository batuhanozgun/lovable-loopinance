
/**
 * Ekstre dönem hesaplama işlemleri için servis
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount } from '../../../../cashAccountHomepage/types';
import { format } from 'date-fns';
import { PeriodCalculator, SpecificDayCalculator } from './calculators';

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

  /**
   * Belirli bir günün tarihini döndürür, eğer gün ay içinde yoksa ayın son gününü döndürür
   */
  private static getSpecificDayDate(year: number, month: number, day: number): Date {
    return SpecificDayCalculator.getSpecificDayDate(year, month, day);
  }

  /**
   * Ayın son iş gününü hesaplar (hafta sonlarını dikkate alır)
   */
  private static getLastBusinessDay(lastDayOfMonth: Date): Date {
    return SpecificDayCalculator.getLastBusinessDay(lastDayOfMonth);
  }
}
