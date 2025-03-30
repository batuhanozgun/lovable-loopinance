
/**
 * Ekstre servis paylaşımlı yardımcı fonksiyonlar
 */
import { format } from 'date-fns';
import { StatementStatus } from '../../../types';

/**
 * Tarih nesnesini string formatına dönüştürür
 */
export const formatDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Bir tarihin güncel durumuna göre ekstre durumunu belirler
 */
export const determineStatementStatus = (startDate: Date, currentDate: Date): StatementStatus => {
  // Eğer başlangıç tarihi bugünden sonraysa, gelecek dönem
  if (startDate > currentDate) {
    return StatementStatus.FUTURE;
  }
  
  // Aksi halde açık dönem
  return StatementStatus.OPEN;
};
