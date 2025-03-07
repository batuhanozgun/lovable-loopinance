
/**
 * Kalan gün sayısını hesapla
 */
export const calculateDaysRemaining = (endDateStr?: string): number => {
  if (!endDateStr) return 0;
  
  const endDate = new Date(endDateStr);
  const now = new Date();
  
  // Süre dolmuşsa 0 gün kaldı
  if (now > endDate) return 0;
  
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Tarih geçmiş mi kontrol et
 */
export const isDateExpired = (dateStr?: string): boolean => {
  if (!dateStr) return true;
  
  const date = new Date(dateStr);
  const now = new Date();
  
  return now > date;
};
