
import { ISubscription } from "../../../domain/models/Subscription";
import { isDateExpired } from "../../utils/dateUtils";

/**
 * Abonelik deneme süresi doğrulama servisi
 */
export class SubscriptionTrialValidator {
  /**
   * Deneme süresinin geçerli olup olmadığını kontrol eder
   */
  static isTrialValid(subscription: ISubscription): boolean {
    if (subscription.status !== 'trial') {
      return false;
    }
    
    if (!subscription.trial_ends_at) {
      return false;
    }
    
    return !isDateExpired(subscription.trial_ends_at);
  }
  
  /**
   * Deneme süresinin dolup dolmadığını kontrol eder
   */
  static isTrialExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'trial') {
      return false;
    }
    
    if (!subscription.trial_ends_at) {
      return true;
    }
    
    return isDateExpired(subscription.trial_ends_at);
  }
}
