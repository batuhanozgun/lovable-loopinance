
import { ISubscription } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";

/**
 * Veritabanı yanıtlarını ISubscription tipine dönüştüren servis
 */
export class SubscriptionMapperService {
  /**
   * Veritabanı yanıtını ISubscription tipine dönüştürür
   */
  static mapDbResponseToSubscription(data: any): ISubscription {
    try {
      return {
        id: data.id,
        user_id: data.user_id,
        plan_type: data.plan_type,
        status: data.status,
        trial_starts_at: data.trial_starts_at ? new Date(data.trial_starts_at) : null,
        trial_ends_at: data.trial_ends_at ? new Date(data.trial_ends_at) : null,
        current_period_starts_at: data.current_period_starts_at ? new Date(data.current_period_starts_at) : null,
        current_period_ends_at: data.current_period_ends_at ? new Date(data.current_period_ends_at) : null,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at)
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik verisi dönüştürülürken hata oluştu', error);
      throw error;
    }
  }
}
