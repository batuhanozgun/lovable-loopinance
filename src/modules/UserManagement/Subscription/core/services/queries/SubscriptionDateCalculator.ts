
import { ISubscription } from "../../../domain/models/Subscription";
import { StatusService } from "../../../features/status/services/StatusService";

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
}
