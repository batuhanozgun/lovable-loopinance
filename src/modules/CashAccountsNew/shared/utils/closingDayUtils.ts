
import { ClosingDayType } from '../types';

/**
 * Belirlenen hesap kesim ayarına göre ay sonunu hesaplar
 * @param date Tarih
 * @param dayType Kapanış günü tipi
 * @param dayValue Belirli gün değeri (SPECIFIC_DAY tipi için)
 * @returns Hesaplanan kapanış günü
 */
export const calculateClosingDay = (
  date: Date,
  dayType: ClosingDayType, 
  dayValue?: number
): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  switch (dayType) {
    case ClosingDayType.LAST_DAY:
      // Ayın son günü
      return new Date(year, month + 1, 0);
      
    case ClosingDayType.LAST_BUSINESS_DAY:
      // Ayın son iş günü (hafta sonu değil)
      const lastDay = new Date(year, month + 1, 0);
      const dayOfWeek = lastDay.getDay();
      
      // 0: Pazar, 6: Cumartesi ise geriye doğru iş gününe git
      if (dayOfWeek === 0) { // Pazar
        return new Date(year, month + 1, -2);
      } else if (dayOfWeek === 6) { // Cumartesi
        return new Date(year, month + 1, -1);
      }
      return lastDay;
      
    case ClosingDayType.SPECIFIC_DAY:
      // Belirli bir gün - değer 1-28 arasında olmalı
      if (!dayValue || dayValue < 1 || dayValue > 28) {
        return new Date(year, month + 1, 0); // Geçersiz değer, ayın son günü
      }
      
      // Ayın son gününü bul
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      
      // Belirtilen gün ayın son gününden büyükse, ayın son gününü kullan
      const actualDay = Math.min(dayValue, lastDayOfMonth);
      return new Date(year, month, actualDay);
      
    default:
      return new Date(year, month + 1, 0);
  }
};

/**
 * Kapanış günü tipinin çeviri anahtarını döndürür
 * @param closingDayType Kapanış günü tipi
 * @returns Çeviri anahtarı
 */
export const getClosingDayTypeLabel = (closingDayType: ClosingDayType): string => {
  switch (closingDayType) {
    case ClosingDayType.LAST_DAY:
      return 'CashAccountsNew.forms:accountForm.closingDayType.options.lastDay';
    case ClosingDayType.LAST_BUSINESS_DAY:
      return 'CashAccountsNew.forms:accountForm.closingDayType.options.lastBusinessDay';
    case ClosingDayType.SPECIFIC_DAY:
      return 'CashAccountsNew.forms:accountForm.closingDayType.options.specificDay';
    default:
      return '';
  }
};
