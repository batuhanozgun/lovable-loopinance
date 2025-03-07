
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";
import { ISubscriptionResponse } from "../../../domain/models/Subscription";

/**
 * Abonelik sorguları için hata yönetim servisi
 */
export class SubscriptionQueryErrorHandler {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionQueryErrorHandler");

  /**
   * Abonelik bulunamadığında kullanılacak hata yanıtı oluştur
   */
  static createNotFoundError(): ISubscriptionResponse {
    return {
      success: false,
      error: "Abonelik bilgileri bulunamadı"
    };
  }

  /**
   * Beklenmeyen hatalar için yanıt oluştur
   */
  static handleUnexpectedError(error: unknown): ISubscriptionResponse {
    this.logger.error("Abonelik bilgileri alınırken beklenmeyen hata", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Abonelik bilgileri alınamadı"
    };
  }
}
