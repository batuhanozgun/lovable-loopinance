
/**
 * Hesap kesim günü için yardımcı işlevler
 */
import { ClosingDayType } from '../../accountManagement/types';

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
 * Hesap dönemi başlangıç tarihini hesaplar
 */
export const calculateStatementStartDate = (
  previousClosingDate: Date | null
): Date => {
  if (!previousClosingDate) {
    // İlk dönem için, bugünün ayının başlangıcını al
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }
  
  // Önceki dönem kapanış tarihinden sonraki gün
  const nextDay = new Date(previousClosingDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
};
