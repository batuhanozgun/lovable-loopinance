
import { ISubscription } from "../../../domain/models/Subscription";
import { StatusService } from "../../../features/status/services/StatusService";
import { calculateDaysRemaining } from "../../utils/dateUtils";

/**
 * Abonelik süreleri hesaplama servisi
 */
export class SubscriptionDateCalculator {
  /**
   * Abonelik için kalan gün sayısını hesapla
   */
  static calculateRemainingDays(subscription: ISubscription): number {
    return StatusService.calculateDaysRemaining(subscription);
  }
  
  /**
   * Deneme süresi için kalan gün sayısını hesapla
   */
  static calculateTrialDaysRemaining(subscription: ISubscription): number {
    if (!subscription.trial_ends_at) {
      return 0;
    }
    
    return calculateDaysRemaining(subscription.trial_ends_at);
  }
  
  /**
   * Abonelik dönemi için kalan gün sayısını hesapla
   */
  static calculatePeriodDaysRemaining(subscription: ISubscription): number {
    if (!subscription.current_period_ends_at) {
      return 0;
    }
    
    return calculateDaysRemaining(subscription.current_period_ends_at);
  }
}
