
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISubscription, ISubscriptionResponse } from "../../types/ISubscription";
import { isDateExpired } from "../../utils/dateUtils";
import { SubscriptionQueryService } from "../query/SubscriptionQueryService";
import { SubscriptionUpdateService } from "../update/SubscriptionUpdateService";

export class SubscriptionValidationService {
  private static logger = LoggerService.getInstance("SubscriptionValidationService");

  /**
   * Kullanıcının abonelik durumunu kontrol et
   */
  static async checkSubscriptionStatus(userId: string): Promise<ISubscriptionResponse> {
    try {
      const response = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!response.success || !response.subscription) {
        return response;
      }
      
      const subscription = response.subscription;
      
      // Trial süresi dolmuş mu kontrol et
      if (subscription.status === 'trial') {
        if (isDateExpired(subscription.trial_ends_at)) {
          this.logger.info("Kullanıcının deneme süresi dolmuş", { userId });
          
          // Deneme süresi dolan kullanıcının durumunu güncelle
          await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
          
          return {
            success: true,
            subscription: SubscriptionUpdateService.updateSubscriptionWithStatus(subscription, 'expired'),
            daysRemaining: 0
          };
        }
      }
      
      // Aktif abonelik süresi dolmuş mu kontrol et
      if (subscription.status === 'active' && subscription.current_period_ends_at) {
        if (isDateExpired(subscription.current_period_ends_at)) {
          this.logger.info("Kullanıcının aktif abonelik süresi dolmuş", { userId });
          
          // Süresi dolan kullanıcının durumunu güncelle
          await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
          
          return {
            success: true,
            subscription: SubscriptionUpdateService.updateSubscriptionWithStatus(subscription, 'expired'),
            daysRemaining: 0
          };
        }
      }
      
      return response;
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken beklenmeyen hata", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Abonelik durumu kontrol edilemedi"
      };
    }
  }
}
