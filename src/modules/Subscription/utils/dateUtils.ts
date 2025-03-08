
/**
 * İki tarih arasındaki gün farkını hesaplar
 */
export const getDaysBetweenDates = (startDate: Date, endDate: Date): number => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / millisecondsPerDay);
};

/**
 * Belirtilen tarihten bugüne kadar kalan gün sayısını hesaplar
 */
export const getDaysRemaining = (endDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Eğer bitiş tarihi geçmişse 0 dön
  if (endDate < today) {
    return 0;
  }
  
  return getDaysBetweenDates(today, endDate);
};

/**
 * Tarihi formatlar
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};
