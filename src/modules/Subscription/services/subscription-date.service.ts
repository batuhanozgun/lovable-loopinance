
import { SubscriptionPlanType } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";

/**
 * Abonelik için tarih hesaplamalarını yöneten servis
 */
export class SubscriptionDateService {
  /**
   * Deneme süresi için bitiş tarihini hesaplar (varsayılan 14 gün)
   */
  static calculateTrialEndDate(startDate: Date = new Date()): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 14); // 14 günlük deneme süresi
    return endDate;
  }

  /**
   * Belirtilen abonelik planı için bitiş tarihini hesaplar
   */
  static calculatePeriodEndDate(planType: SubscriptionPlanType, startDate: Date = new Date()): Date {
    const endDate = new Date(startDate);
    
    switch (planType) {
      case SubscriptionPlanType.MONTHLY:
        // Aylık plan için 30 gün ekle
        endDate.setDate(endDate.getDate() + 30);
        break;
      case SubscriptionPlanType.YEARLY:
        // Yıllık plan için 365 gün ekle
        endDate.setDate(endDate.getDate() + 365);
        break;
      case SubscriptionPlanType.TRIAL:
        // Deneme süresi için 14 gün ekle
        endDate.setDate(endDate.getDate() + 14);
        break;
      default:
        subscriptionLogger.warn('Bilinmeyen plan tipi için varsayılan süre (14 gün) kullanılıyor', { planType });
        endDate.setDate(endDate.getDate() + 14);
    }
    
    return endDate;
  }
  
  /**
   * Şimdiki zamanı döndürür (test edilebilirlik için)
   */
  static getCurrentDate(): Date {
    return new Date();
  }
}
