
import { ISubscription } from "../../types/ISubscription";
import { isDateExpired } from "../../utils/dateUtils";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";

/**
 * Deneme süresi doğrulama servisi
 */
export class SubscriptionTrialValidator {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionTrialValidator");

  /**
   * Deneme süresinin dolup dolmadığını kontrol et
   */
  static isTrialExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'trial') {
      return false;
    }
    
    const isExpired = isDateExpired(subscription.trial_ends_at);
    
    if (isExpired) {
      this.logger.info("Kullanıcının deneme süresi dolmuş", { userId: subscription.user_id });
    }
    
    return isExpired;
  }
}
