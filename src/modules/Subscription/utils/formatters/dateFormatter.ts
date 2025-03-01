
import { format, formatDistance } from "date-fns";
import { tr, enUS } from "date-fns/locale";

/**
 * Tarih formatlama yardımcıları
 */
class DateFormatter {
  /**
   * Tarihi belirtilen formatta biçimlendirir
   */
  formatDate(date: Date | string | null, formatString: string = "PPP", locale: string = "tr"): string {
    if (!date) return "";
    
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const dateLocale = locale === "tr" ? tr : enUS;
    
    return format(dateObj, formatString, { locale: dateLocale });
  }

  /**
   * İki tarih arasındaki mesafeyi insan diline uygun şekilde formatlar
   */
  formatDistance(date: Date | string, baseDate: Date = new Date(), locale: string = "tr"): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const dateLocale = locale === "tr" ? tr : enUS;
    
    return formatDistance(dateObj, baseDate, { 
      locale: dateLocale,
      addSuffix: true 
    });
  }

  /**
   * Kalan gün sayısını formatlar
   */
  formatRemainingDays(days: number | null): string {
    if (days === null) return "";
    if (days === 0) return "Bugün sona eriyor";
    if (days === 1) return "1 gün kaldı";
    return `${days} gün kaldı`;
  }
}

export const dateFormatter = new DateFormatter();
