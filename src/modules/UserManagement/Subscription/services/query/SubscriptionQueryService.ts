
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISubscriptionResponse } from "../../types/ISubscription";
import { SubscriptionRepositoryFactory } from "../../repositories/SubscriptionRepositoryFactory";
import { calculateDaysRemaining } from "../../utils/dateUtils";

export class SubscriptionQueryService {
  private static logger = LoggerService.getInstance("SubscriptionQueryService");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    try {
      this.logger.debug("Kullanıcı abonelik bilgileri alınıyor", { userId });

      const queryRepository = SubscriptionRepositoryFactory.getQueryRepository();
      const { subscription, error } = await queryRepository.getByUserId(userId);

      if (error || !subscription) {
        return {
          success: false,
          error: error || "Abonelik bilgileri bulunamadı"
        };
      }
      
      // Deneme süresi için kalan gün hesaplama
      const daysRemaining = subscription.status === 'trial' 
        ? calculateDaysRemaining(subscription.trial_ends_at)
        : calculateDaysRemaining(subscription.current_period_ends_at);

      this.logger.debug("Kullanıcı abonelik bilgileri başarıyla alındı", { 
        userId, 
        status: subscription.status,
        daysRemaining 
      });
      
      return {
        success: true,
        subscription,
        daysRemaining
      };
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken beklenmeyen hata", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Abonelik bilgileri alınamadı"
      };
    }
  }
}
