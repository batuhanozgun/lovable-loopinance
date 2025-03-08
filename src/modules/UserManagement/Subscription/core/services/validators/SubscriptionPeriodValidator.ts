
import { ISubscription } from "../../../domain/models/Subscription";
import { isDateExpired } from "../../utils/dateUtils";

/**
 * Abonelik ödeme dönemi doğrulama servisi
 */
export class SubscriptionPeriodValidator {
  /**
   * Ödeme döneminin hala geçerli olup olmadığını kontrol eder
   */
  static isPeriodValid(subscription: ISubscription): boolean {
    if (subscription.status !== 'active') {
      return false;
    }
    
    if (!subscription.current_period_ends_at) {
      return false;
    }
    
    return !isDateExpired(subscription.current_period_ends_at);
  }
  
  /**
   * Ödeme döneminin sona erip ermediğini kontrol eder
   */
  static isPeriodExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'active') {
      return false;
    }
    
    if (!subscription.current_period_ends_at) {
      return true;
    }
    
    return isDateExpired(subscription.current_period_ends_at);
  }
}
