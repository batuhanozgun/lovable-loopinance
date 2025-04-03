
/**
 * Tarih ve zaman işlemleri için yardımcı fonksiyonlar
 */

/**
 * Dakika değerini en yakın 15'in katına yuvarla
 */
export const roundToNearest15Minutes = (minuteValue: number): string => {
  const roundedMinute = Math.round(minuteValue / 15) * 15;
  if (roundedMinute === 60) return '00';
  return roundedMinute.toString().padStart(2, '0');
};

/**
 * Şu anki tarih ve zamanı alır, 15 dakika hassasiyetinde
 */
export const getCurrentRoundedTime = () => {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinuteValue = now.getMinutes();
  const roundedMinute = roundToNearest15Minutes(currentMinuteValue);
  
  return {
    date: now,
    time: { 
      hour: currentHour, 
      minute: roundedMinute 
    }
  };
};

/**
 * Transaction tarihinden saat ve dakika bilgisini çıkarır
 */
export const getTimeFromTransaction = (transactionTime: string) => {
  const [hour, minute] = transactionTime.substring(0, 5).split(':');
  return { hour, minute };
};
