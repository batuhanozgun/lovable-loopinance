
import { SubscriptionStatus } from "../../domain/models/Subscription";

export interface ISubscriptionUpdateRepository {
  /**
   * Abonelik durumunu güncelle
   */
  updateStatus(userId: string, status: SubscriptionStatus): Promise<boolean>;
}
