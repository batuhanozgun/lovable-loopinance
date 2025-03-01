
import { ISubscription } from "../../interfaces/subscription/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

/**
 * Deneme süresi hesaplamaları için yardımcı fonksiyonlar
 */
class TrialPeriodCalculator {
  private logger = LoggerService.getInstance("TrialPeriodCalculator");

  /**
   * Deneme süresinin durumunu hesaplar
   */
  calculateTrialStatus(subscription: ISubscription): {
    isExpired: boolean;
    remainingDays: number | null;
    endDate: Date | null;
  } {
    if (subscription.type !== 'trial' || !subscription.trial_ends_at) {
      return {
        isExpired: true,
        remainingDays: null,
        endDate: null
      };
    }

    const trialEndsAt = new Date(subscription.trial_ends_at);
    const now = new Date();
    
    const isExpired = now > trialEndsAt;
    
    let remainingDays = null;
    if (!isExpired) {
      // Milisaniyeden gün hesabı
      const remainingMilliseconds = trialEndsAt.getTime() - now.getTime();
      remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
    } else {
      remainingDays = 0;
    }

    return {
      isExpired,
      remainingDays,
      endDate: trialEndsAt
    };
  }

  /**
   * Deneme süresinin kritik durumda olup olmadığını kontrol eder
   */
  isTrialCritical(remainingDays: number | null): boolean {
    if (remainingDays === null) return false;
    return remainingDays <= 7 && remainingDays > 0;
  }

  /**
   * Deneme süresinin bitmesine yakın olup olmadığını kontrol eder
   */
  isTrialEnding(remainingDays: number | null): boolean {
    if (remainingDays === null) return false;
    return remainingDays <= 3 && remainingDays > 0;
  }
}

export const trialPeriodCalculator = new TrialPeriodCalculator();
