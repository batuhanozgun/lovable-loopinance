
/**
 * Abonelik modülü için tarih yardımcı fonksiyonları
 */

/**
 * İki tarih arasındaki gün farkını hesaplar
 */
export const calculateDaysBetween = (startDate: Date | string | null, endDate: Date | string | null): number => {
  if (!startDate || !endDate) return 0;
  
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Geçerli tarihler mi kontrol et
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
  // Günü, ayı ve yılı alıp zaman kısmını sıfırlayarak tam günler arası hesaplama yap
  const startWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  // Milisaniye farkını gün sayısına çevir
  const diffInTime = endWithoutTime.getTime() - startWithoutTime.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
  
  return diffInDays;
};

/**
 * Belirtilen tarih ile bugün arasındaki gün farkını hesaplar
 */
export const calculateDaysRemaining = (endDate: Date | string | null): number => {
  if (!endDate) return 0;
  
  const today = new Date();
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Geçerli tarih mi kontrol et
  if (isNaN(end.getTime())) return 0;
  
  // Günü, ayı ve yılı alıp zaman kısmını sıfırlayarak tam günler arası hesaplama yap
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  // Milisaniye farkını gün sayısına çevir
  const diffInTime = endWithoutTime.getTime() - todayWithoutTime.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
  
  return diffInDays > 0 ? diffInDays : 0;
};

/**
 * Tarihi yerel formatta görüntüler
 */
export const formatDateLocale = (date: Date | string | null): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Geçerli tarih mi kontrol et
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
