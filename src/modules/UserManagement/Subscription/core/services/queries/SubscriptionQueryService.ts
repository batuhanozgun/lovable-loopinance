
import { ISubscriptionResponse } from "../../../domain/models/Subscription";
import { SubscriptionRepositoryFactory } from "../../../repositories/SubscriptionRepositoryFactory";
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";
import { SubscriptionDataMapper } from "./SubscriptionDataMapper";
import { SubscriptionDateCalculator } from "./SubscriptionDateCalculator";
import { SubscriptionQueryErrorHandler } from "./SubscriptionQueryErrorHandler";

export class SubscriptionQueryService {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionQueryService");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    try {
      this.logger.debug("Kullanıcı abonelik bilgileri alınıyor", { userId });

      const queryRepository = SubscriptionRepositoryFactory.getQueryRepository();
      const { subscription, error } = await queryRepository.getByUserId(userId);

      if (error || !subscription) {
        return SubscriptionQueryErrorHandler.createNotFoundError();
      }
      
      // Abonelik verilerini domain modeline dönüştür
      const domainSubscription = SubscriptionDataMapper.mapToDomainModel(subscription);
      
      // Kalan gün sayısını hesapla
      const daysRemaining = SubscriptionDateCalculator.calculateRemainingDays(domainSubscription);

      this.logger.debug("Kullanıcı abonelik bilgileri başarıyla alındı", { 
        userId, 
        status: domainSubscription.status,
        daysRemaining 
      });
      
      return {
        success: true,
        subscription: domainSubscription,
        daysRemaining
      };
    } catch (error) {
      return SubscriptionQueryErrorHandler.handleUnexpectedError(error);
    }
  }
}
