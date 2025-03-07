
import { ISubscription, ISubscriptionResponse } from "../../types/ISubscription";
import { SubscriptionUpdateService } from "../update/SubscriptionUpdateService";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";

/**
 * Abonelik durumu yönetim servisi
 */
export class SubscriptionStatusManager {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionStatusManager");

  /**
   * Abonelik durumunu 'expired' olarak güncelle
   */
  static async markAsExpired(userId: string, subscription: ISubscription): Promise<ISubscriptionResponse> {
    this.logger.info("Abonelik durumu 'expired' olarak güncelleniyor", { userId });
    
    // Durumu güncelle
    await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
    
    // Güncellenmiş abonelik nesnesini oluştur
    const updatedSubscription = SubscriptionUpdateService.updateSubscriptionWithStatus(subscription, 'expired');
    
    return {
      success: true,
      subscription: updatedSubscription,
      daysRemaining: 0
    };
  }
}
