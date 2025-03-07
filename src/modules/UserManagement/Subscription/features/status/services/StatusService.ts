
import { ISubscription, ISubscriptionResponse, SubscriptionStatus } from "../../../domain/models/Subscription";
import { SubscriptionLoggerService } from "../../../core/services/shared/SubscriptionLoggerService";
import { SubscriptionUpdateService } from "../../../core/services/mutations/SubscriptionUpdateService";
import { TrialService } from "../../trial/services/TrialService";
import { PaymentService } from "../../payment/services/PaymentService";

/**
 * Abonelik durumu yönetim servisi
 */
export class StatusService {
  private static logger = SubscriptionLoggerService.getLogger("StatusService");

  /**
   * Abonelik durumunu 'expired' olarak güncelle
   */
  static async markAsExpired(userId: string, subscription: ISubscription): Promise<ISubscriptionResponse> {
    this.logger.info("Abonelik durumu 'expired' olarak güncelleniyor", { userId });
    
    // Durumu güncelle
    await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
    
    // Güncellenmiş abonelik nesnesini oluştur
    const updatedSubscription = SubscriptionUpdateService.updateSubscriptionWithStatus(subscription, 'expired');
    
    return {
      success: true,
      subscription: updatedSubscription,
      daysRemaining: 0
    };
  }
  
  /**
   * Abonelik durumunu doğrula ve gerekirse güncelle
   */
  static async validateSubscriptionStatus(userId: string, subscription: ISubscription): Promise<ISubscriptionResponse> {
    // Trial süresi dolmuş mu kontrol et
    if (TrialService.isTrialExpired(subscription)) {
      return await this.markAsExpired(userId, subscription);
    }
    
    // Ödeme dönemi sona ermiş mi kontrol et
    if (PaymentService.isPaymentPeriodExpired(subscription)) {
      return await this.markAsExpired(userId, subscription);
    }
    
    // Doğrulama geçildiyse mevcut durumu koru
    const daysRemaining = this.calculateDaysRemaining(subscription);
    
    return {
      success: true,
      subscription,
      daysRemaining
    };
  }
  
  /**
   * Abonelik için kalan gün sayısını hesapla
   */
  static calculateDaysRemaining(subscription: ISubscription): number {
    if (subscription.status === 'trial') {
      return TrialService.calculateTrialDaysRemaining(subscription);
    }
    
    if (subscription.status === 'active') {
      return PaymentService.calculatePaymentDaysRemaining(subscription);
    }
    
    return 0;
  }
}
