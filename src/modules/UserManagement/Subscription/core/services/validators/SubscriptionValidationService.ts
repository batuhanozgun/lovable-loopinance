
import { ISubscription, ISubscriptionResponse } from "../../../domain/models/Subscription";
import { SubscriptionQueryService } from "../queries/SubscriptionQueryService";
import { StatusService } from "../../../features/status/services/StatusService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const logger = LoggerService.getInstance("SubscriptionValidationService");

/**
 * Abonelik doğrulama servisi
 */
export class SubscriptionValidationService {
  /**
   * Kullanıcının abonelik durumunu kontrol et
   */
  static async checkSubscriptionStatus(userId: string): Promise<ISubscriptionResponse> {
    try {
      // Kullanıcının abonelik bilgilerini getir
      const result = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!result.success || !result.subscription) {
        return result;
      }
      
      // Abonelik durumunu validate et ve gerekiyorsa güncelle
      const validationResult = await StatusService.validateSubscriptionStatus(
        userId,
        result.subscription
      );
      
      return validationResult;
    } catch (error) {
      logger.error("Abonelik durum kontrolü sırasında beklenmeyen hata", error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Abonelik durumu kontrol edilirken bir hata oluştu"
      };
    }
  }
}
