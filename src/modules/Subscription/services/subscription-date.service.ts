
import { SubscriptionPlanType } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";

/**
 * Abonelik için tarih hesaplamalarını yöneten servis
 */
export class SubscriptionDateService {
  /**
   * Deneme süresi için bitiş tarihini hesaplar (6 ay)
   */
  static calculateTrialEndDate(startDate: Date = new Date()): Date {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 6); // 6 aylık deneme süresi
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
        // Deneme süresi için 6 ay ekle
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      default:
        subscriptionLogger.warn('Bilinmeyen plan tipi için varsayılan süre (6 ay) kullanılıyor', { planType });
        endDate.setMonth(endDate.getMonth() + 6);
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
