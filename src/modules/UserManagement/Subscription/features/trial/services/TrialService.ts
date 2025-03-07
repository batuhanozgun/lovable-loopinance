
import { ISubscription, SubscriptionStatus } from "../../../domain/models/Subscription";
import { ITrial, createTrialModel } from "../../../domain/models/Trial";
import { isDateExpired } from "../../../helpers/date/dateUtils";
import { SubscriptionLoggerService } from "../../../core/services/shared/SubscriptionLoggerService";

/**
 * Trial yönetimi servisi
 */
export class TrialService {
  private static logger = SubscriptionLoggerService.getLogger("TrialService");

  /**
   * Abonelikten trial modeli oluştur
   */
  static createTrialFromSubscription(subscription: ISubscription): ITrial {
    return createTrialModel(
      subscription.trial_starts_at,
      subscription.trial_ends_at,
      subscription.status
    );
  }

  /**
   * Deneme süresinin dolup dolmadığını kontrol et
   */
  static isTrialExpired(subscription: ISubscription): boolean {
    if (subscription.status !== 'trial') {
      return false;
    }
    
    const isExpired = isDateExpired(subscription.trial_ends_at);
    
    if (isExpired) {
      this.logger.info("Kullanıcının deneme süresi dolmuş", { userId: subscription.user_id });
    }
    
    return isExpired;
  }
  
  /**
   * Deneme süresinin kalan gün sayısını hesapla
   */
  static calculateTrialDaysRemaining(subscription: ISubscription): number {
    const trial = this.createTrialFromSubscription(subscription);
    return trial.days_remaining;
  }
}
