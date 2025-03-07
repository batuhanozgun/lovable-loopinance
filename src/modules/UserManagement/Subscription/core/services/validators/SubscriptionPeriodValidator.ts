
import { ISubscription } from "../../../domain/models/Subscription";
import { isDateExpired } from "../../../helpers/date/dateUtils";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";

/**
 * Aktif abonelik süresi doğrulama servisi
 */
export class SubscriptionPeriodValidator {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionPeriodValidator");

  /**
   * Aktif abonelik süresinin dolup dolmadığını kontrol et
   */
  static isSubscriptionPeriodExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'active' || !subscription.current_period_ends_at) {
      return false;
    }
    
    const isExpired = isDateExpired(subscription.current_period_ends_at);
    
    if (isExpired) {
      this.logger.info("Kullanıcının aktif abonelik süresi dolmuş", { userId: subscription.user_id });
    }
    
    return isExpired;
  }
}
