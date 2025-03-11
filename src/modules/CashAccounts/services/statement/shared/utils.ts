
/**
 * Statement servisleri için yardımcı fonksiyonlar
 */
import { format, isAfter, startOfDay } from 'date-fns';
import { AccountStatement, StatementStatus } from '../../../types';

/**
 * Ekstre için uygun durum belirler
 */
export const determineStatementStatus = (
  startDate: Date, 
  currentDate: Date
): StatementStatus => {
  // Ekstre başlangıç tarihi henüz gelmediyse FUTURE statüsü ata
  if (isAfter(startOfDay(startDate), startOfDay(currentDate))) {
    return StatementStatus.FUTURE;
  }
  
  // Başlangıç tarihi geldiyse OPEN statüsü ata
  return StatementStatus.OPEN;
};

/**
 * Ekstre dönem bilgisini formatlayarak döndürür
 */
export const formatStatementPeriod = (statement: AccountStatement): string => {
  return `${statement.start_date} - ${statement.end_date}`;
};

/**
 * Tarihi string formatına dönüştürür
 */
export const formatDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
