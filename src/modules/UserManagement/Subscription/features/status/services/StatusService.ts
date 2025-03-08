
import { ISubscription, SubscriptionStatus } from "../../../domain/models/Subscription";
import { ITrialResponse, createTrialModel } from "../../../domain/models/Trial";
import { IPaymentResponse, createPaymentModel } from "../../../domain/models/Payment";
import { SubscriptionUpdateService } from "../../../core/services/mutations/SubscriptionUpdateService";
import { SubscriptionLoggerService } from "../../../core/services/shared/SubscriptionLoggerService";

/**
 * Abonelik durumu yönetimi servisi
 */
export class StatusService {
  private static logger = SubscriptionLoggerService.getLogger("StatusService");

  /**
   * Abonelik için Trial modelini oluştur
   */
  static createTrialFromSubscription(subscription: ISubscription) {
    return createTrialModel(
      subscription.trial_starts_at,
      subscription.trial_ends_at,
      subscription.status
    );
  }

  /**
   * Abonelik için Payment modelini oluştur
   */
  static createPaymentFromSubscription(subscription: ISubscription) {
    if (!subscription.current_period_ends_at) {
      return undefined;
    }
    
    return createPaymentModel(
      subscription.plan_type,
      subscription.current_period_starts_at,
      subscription.current_period_ends_at,
      subscription.status === 'active'
    );
  }
  
  /**
   * Deneme süresinin bitip bitmediğini kontrol et
   */
  static isTrialExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'trial') {
      return false;
    }
    
    const trial = this.createTrialFromSubscription(subscription);
    return !trial.is_active || trial.days_remaining <= 0;
  }

  /**
   * Aktif abonelik süresinin bitip bitmediğini kontrol et
   */
  static isSubscriptionPeriodExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'active' || !subscription.current_period_ends_at) {
      return false;
    }
    
    const payment = this.createPaymentFromSubscription(subscription);
    return payment ? !payment.is_active || payment.days_remaining <= 0 : true;
  }

  /**
   * Abonelik durumunu validasyon ve gerekirese güncelleme
   */
  static async validateSubscriptionStatus(
    userId: string,
    subscription: ISubscription
  ): Promise<{
    success: boolean;
    subscription?: ISubscription;
    daysRemaining?: number;
    error?: string;
  }> {
    try {
      // Trial durumunu hesapla
      const trial = this.createTrialFromSubscription(subscription);
      
      // Payment durumunu hesapla (varsa)
      const payment = this.createPaymentFromSubscription(subscription);
      
      // Durumu kontrol et ve gerekirse güncelle
      let updatedSubscription = { ...subscription, trial, payment };
      let daysRemaining = 0;
      
      // Trial süresi dolmuş mu kontrol et
      if (this.isTrialExpired(subscription)) {
        this.logger.info("Kullanıcının deneme süresi dolmuş", { userId });
        
        // Durumu expired olarak güncelle
        await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
        updatedSubscription.status = 'expired';
        
        return {
          success: true,
          subscription: updatedSubscription,
          daysRemaining: 0
        };
      }
      
      // Aktif abonelik süresi dolmuş mu kontrol et
      if (this.isSubscriptionPeriodExpired(subscription)) {
        this.logger.info("Kullanıcının aktif abonelik süresi dolmuş", { userId });
        
        // Durumu expired olarak güncelle
        await SubscriptionUpdateService.updateSubscriptionStatus(userId, 'expired');
        updatedSubscription.status = 'expired';
        
        return {
          success: true,
          subscription: updatedSubscription,
          daysRemaining: 0
        };
      }
      
      // Kalan gün sayısını hesapla
      daysRemaining = this.calculateDaysRemaining(updatedSubscription);
      
      return {
        success: true,
        subscription: updatedSubscription,
        daysRemaining
      };
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken beklenmeyen hata", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata"
      };
    }
  }
  
  /**
   * Abonelik için kalan gün sayısını hesapla
   */
  static calculateDaysRemaining(subscription: ISubscription): number {
    if (subscription.status === 'trial' && subscription.trial) {
      return subscription.trial.days_remaining;
    }
    
    if (subscription.status === 'active' && subscription.payment) {
      return subscription.payment.days_remaining;
    }
    
    return 0;
  }
}
