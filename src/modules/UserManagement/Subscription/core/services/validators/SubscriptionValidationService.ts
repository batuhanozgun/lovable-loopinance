
import { ISubscriptionResponse } from "../../../domain/models/Subscription";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";
import { SubscriptionQueryService } from "../queries/SubscriptionQueryService";
import { SubscriptionTrialValidator } from "./SubscriptionTrialValidator";
import { SubscriptionPeriodValidator } from "./SubscriptionPeriodValidator";
import { SubscriptionStatusManager } from "../managers/SubscriptionStatusManager";
import { SubscriptionQueryErrorHandler } from "../queries/SubscriptionQueryErrorHandler";

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
      
      const subscription = response.subscription;
      
      // Trial süresi dolmuş mu kontrol et
      if (SubscriptionTrialValidator.isTrialExpired(subscription)) {
        return await SubscriptionStatusManager.markAsExpired(userId, subscription);
      }
      
      // Aktif abonelik süresi dolmuş mu kontrol et
      if (SubscriptionPeriodValidator.isSubscriptionPeriodExpired(subscription)) {
        return await SubscriptionStatusManager.markAsExpired(userId, subscription);
      }
      
      return response;
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken beklenmeyen hata", error);
      return SubscriptionQueryErrorHandler.handleUnexpectedError(error);
    }
  }
}
