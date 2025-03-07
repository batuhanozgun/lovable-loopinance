
import { ISubscriptionResponse } from "../../../domain/models/Subscription";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";
import { SubscriptionQueryService } from "../queries/SubscriptionQueryService";
import { SubscriptionQueryErrorHandler } from "../queries/SubscriptionQueryErrorHandler";
import { StatusService } from "../../../features/status/services/StatusService";

export class SubscriptionValidationService {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionValidationService");

  /**
   * Kullanıcının abonelik durumunu kontrol et
   */
  static async checkSubscriptionStatus(userId: string): Promise<ISubscriptionResponse> {
    try {
      const response = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!response.success || !response.subscription) {
        return response;
      }
      
      // Abonelik durumunu doğrula ve gerekirse güncelle
      return await StatusService.validateSubscriptionStatus(userId, response.subscription);
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken beklenmeyen hata", error);
      return SubscriptionQueryErrorHandler.handleUnexpectedError(error);
    }
  }
}
