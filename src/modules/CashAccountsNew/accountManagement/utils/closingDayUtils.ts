
import { ClosingDayType } from '../types';

/**
 * Ayın son gününü bulur
 */
export const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Ayın son iş gününü bulur (Cumartesi ve Pazar hariç)
 */
export const getLastBusinessDayOfMonth = (year: number, month: number): Date => {
  let date = new Date(year, month + 1, 0);
  
  // Eğer Cumartesi veya Pazar ise geriye doğru git
  while (date.getDay() === 0 || date.getDay() === 6) {
    date = new Date(date.getTime() - 86400000); // 1 gün geri git
  }
  
  return date;
};

/**
 * Belirli bir gün için tarihi hesaplar
 * Eğer belirtilen gün ayın son gününden büyükse ayın son gününü döner
 */
export const getSpecificDayOfMonth = (year: number, month: number, day: number): Date => {
  const lastDay = getLastDayOfMonth(year, month);
  const actualDay = day > lastDay ? lastDay : day;
  
  return new Date(year, month, actualDay);
};

/**
 * Hesap kesim günü türüne göre tarihi hesaplar
 */
export const calculateClosingDate = (
  date: Date,
  closingDayType: ClosingDayType,
  closingDayValue?: number
): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  switch (closingDayType) {
    case ClosingDayType.LAST_DAY:
      return new Date(year, month + 1, 0);
      
    case ClosingDayType.LAST_BUSINESS_DAY:
      return getLastBusinessDayOfMonth(year, month);
      
    case ClosingDayType.SPECIFIC_DAY:
      if (!closingDayValue) {
        throw new Error('Closing day value is required for SPECIFIC_DAY type');
      }
      return getSpecificDayOfMonth(year, month, closingDayValue);
      
    default:
      return new Date(year, month + 1, 0);
  }
};

/**
 * Seçilebilir hesap kesim günlerini döndürür (1-28 arası)
 */
export const getClosingDayOptions = (): number[] => {
  return Array.from({ length: 28 }, (_, i) => i + 1);
};
