
import { SubscriptionStatus } from "../../types/ISubscription";

export interface ISubscriptionUpdateRepository {
  /**
   * Abonelik durumunu güncelle
   */
  updateStatus(userId: string, status: SubscriptionStatus): Promise<boolean>;
}
