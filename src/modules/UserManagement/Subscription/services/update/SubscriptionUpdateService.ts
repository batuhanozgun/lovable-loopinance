
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";
import { SubscriptionRepositoryFactory } from "../../repositories/SubscriptionRepositoryFactory";
import { ISubscription, SubscriptionStatus } from "../../types/ISubscription";
import { SubscriptionUpdateErrorHandler } from "./SubscriptionUpdateErrorHandler";

export class SubscriptionUpdateService {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionUpdateService");

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
      return SubscriptionUpdateErrorHandler.handleUnexpectedError(error);
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
