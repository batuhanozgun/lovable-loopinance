
import { ISubscription } from "../../types/ISubscription";

export interface ISubscriptionQueryRepository {
  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  getByUserId(userId: string): Promise<{ subscription?: ISubscription, error?: string }>;
}
