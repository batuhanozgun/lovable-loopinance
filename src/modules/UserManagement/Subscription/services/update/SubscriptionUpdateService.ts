
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SubscriptionRepositoryFactory } from "../../repositories/SubscriptionRepositoryFactory";
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
      
      const updateRepository = SubscriptionRepositoryFactory.getUpdateRepository();
      return await updateRepository.updateStatus(userId, status);
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
