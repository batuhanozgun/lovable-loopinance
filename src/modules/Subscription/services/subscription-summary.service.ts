
import { ISubscriptionSummary, SubscriptionStatus } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";
import { SubscriptionQueryService } from "./subscription-query.service";
import { getDaysRemaining } from "../utils/dateUtils";

/**
 * Abonelik özeti oluşturma işlemlerini yöneten servis
 */
export class SubscriptionSummaryService {
  /**
   * Kullanıcının abonelik özetini getirir
   */
  static async getSubscriptionSummary(userId: string): Promise<ISubscriptionSummary | null> {
    try {
      const response = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!response.success || !response.subscription) {
        return null;
      }
      
      const subscription = response.subscription;
      const now = new Date();
      let expiresAt: Date | null = null;
      let daysRemaining = 0;
      let isActive = false;
      let isTrial = subscription.status === SubscriptionStatus.TRIAL;
      
      // Abonelik durumuna göre hesaplama yap
      if (subscription.status === SubscriptionStatus.TRIAL && subscription.trial_ends_at) {
        expiresAt = new Date(subscription.trial_ends_at);
        daysRemaining = getDaysRemaining(expiresAt);
        isActive = expiresAt > now;
      } else if (subscription.status === SubscriptionStatus.ACTIVE && subscription.current_period_ends_at) {
        expiresAt = new Date(subscription.current_period_ends_at);
        daysRemaining = getDaysRemaining(expiresAt);
        isActive = expiresAt > now;
      }
      
      return {
        status: subscription.status,
        plan: subscription.plan_type,
        daysRemaining,
        isActive,
        isTrial,
        expiresAt
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik özeti alınırken hata oluştu', error, { userId });
      return null;
    }
  }
}
