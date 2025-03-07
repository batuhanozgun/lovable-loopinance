
import { SubscriptionLoggerService } from "../shared/SubscriptionLoggerService";

/**
 * Abonelik güncelleme işlemleri için hata yönetim servisi
 */
export class SubscriptionUpdateErrorHandler {
  private static logger = SubscriptionLoggerService.getLogger("SubscriptionUpdateErrorHandler");

  /**
   * Beklenmeyen hatalar için hata yönetimi
   */
  static handleUnexpectedError(error: unknown): boolean {
    this.logger.error("Abonelik durumu güncellenirken beklenmeyen hata", error);
    return false;
  }
}
