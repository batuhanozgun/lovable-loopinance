
import { ISubscription } from "../../../domain/models/Subscription";
import { calculateDaysRemaining } from "../../../helpers/date/dateUtils";

/**
 * Abonelik süreleri hesaplama servisi
 */
export class SubscriptionDateCalculator {
  /**
   * Abonelik için kalan gün sayısını hesapla
   */
  static calculateRemainingDays(subscription: ISubscription): number {
    // Deneme süresi için kalan gün hesaplama
    if (subscription.status === 'trial') {
      return calculateDaysRemaining(subscription.trial_ends_at);
    }
    
    // Aktif abonelik için kalan gün hesaplama
    return calculateDaysRemaining(subscription.current_period_ends_at);
  }
}
