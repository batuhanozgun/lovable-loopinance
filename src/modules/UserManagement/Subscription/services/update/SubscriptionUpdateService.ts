
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository";
import { ISubscription, SubscriptionStatus } from "../../types/ISubscription";

export class SubscriptionUpdateService {
  private static logger = LoggerService.getInstance("SubscriptionUpdateService");

  /**
   * Abonelik durumunu güncelle
   */
  static async updateSubscriptionStatus(
    userId: string, 
    status: SubscriptionStatus
  ): Promise<boolean> {
    try {
      this.logger.debug("Abonelik durumu güncelleniyor", { userId, status });
      return await SubscriptionRepository.updateStatus(userId, status);
    } catch (error) {
      this.logger.error("Abonelik durumu güncellenirken beklenmeyen hata", error);
      return false;
    }
  }

  /**
   * Aboneliği belirli bir statüye güncelle ve güncellenmiş abonelik nesnesini döndür
   */
  static updateSubscriptionWithStatus(
    subscription: ISubscription,
    newStatus: SubscriptionStatus
  ): ISubscription {
    return {
      ...subscription,
      status: newStatus
    };
  }
}
