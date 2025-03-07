
import { SubscriptionLoggerService } from "./shared/SubscriptionLoggerService";
import { ISubscriptionResponse } from "../../domain/models/Subscription";
import { SubscriptionQueryService } from "./queries/SubscriptionQueryService";
import { SubscriptionValidationService } from "./validators/SubscriptionValidationService";

export class SubscriptionService {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionService");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    return SubscriptionQueryService.getUserSubscription(userId);
  }

  /**
   * Kullanıcının abonelik durumunu kontrol et
   */
  static async checkSubscriptionStatus(userId: string): Promise<ISubscriptionResponse> {
    return SubscriptionValidationService.checkSubscriptionStatus(userId);
  }
}
