
import { ISubscription } from "../../../domain/models/Subscription";
import { IPayment, createPaymentModel } from "../../../domain/models/Payment";
import { isDateExpired } from "../../../core/utils/dateUtils";
import { SubscriptionLoggerService } from "../../../core/services/shared/SubscriptionLoggerService";

/**
 * Ödeme yönetimi servisi
 */
export class PaymentService {
  private static logger = SubscriptionLoggerService.getLogger("PaymentService");

  /**
   * Abonelikten payment modeli oluştur
   */
  static createPaymentFromSubscription(subscription: ISubscription): IPayment {
    return createPaymentModel(
      subscription.plan_type,
      subscription.current_period_starts_at,
      subscription.current_period_ends_at,
      subscription.status === 'active'
    );
  }

  /**
   * Ödeme döneminin sona erip ermediğini kontrol et
   */
  static isPaymentPeriodExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'active' || !subscription.current_period_ends_at) {
      return false;
    }
    
    const isExpired = isDateExpired(subscription.current_period_ends_at);
    
    if (isExpired) {
      this.logger.info("Kullanıcının ödeme dönemi sona ermiş", { userId: subscription.user_id });
    }
    
    return isExpired;
  }
  
  /**
   * Ödeme döneminin kalan gün sayısını hesapla
   */
  static calculatePaymentDaysRemaining(subscription: ISubscription): number {
    const payment = this.createPaymentFromSubscription(subscription);
    return payment.days_remaining;
  }
}
