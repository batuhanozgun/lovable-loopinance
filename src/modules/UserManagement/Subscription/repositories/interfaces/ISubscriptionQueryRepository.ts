
import { ISubscription } from "../../domain/models/Subscription";

export interface ISubscriptionQueryRepository {
  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  getByUserId(userId: string): Promise<{ subscription?: ISubscription, error?: string }>;
}
