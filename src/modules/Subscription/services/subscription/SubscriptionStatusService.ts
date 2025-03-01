
import { ISubscription } from "../../interfaces/ISubscription";
import { SubscriptionService } from "../SubscriptionService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { trialPeriodCalculator } from "../../utils/calculators/trialPeriodCalculator";

export class SubscriptionStatusService {
  private static logger = LoggerService.getInstance("SubscriptionStatusService");

  /**
   * Kullanıcı aboneliğinin durumunu ve tüm bilgilerini tek seferde getirir
   */
  static async getSubscriptionStatus(): Promise<{
    subscription: ISubscription | null;
    isPremium: boolean;
    isTrialExpired: boolean;
    remainingDays: number | null;
  }> {
    try {
      const subscription = await SubscriptionService.getCurrentSubscription();
      
      if (!subscription) {
        return {
          subscription: null,
          isPremium: false,
          isTrialExpired: true,
          remainingDays: null
        };
      }
      
      // Premium durumu
      const isPremium = subscription.type === 'premium' || 
                        subscription.type === 'business';
      
      // Trial durumu
      const { isExpired, remainingDays } = trialPeriodCalculator.calculateTrialStatus(subscription);
      
      return {
        subscription,
        isPremium,
        isTrialExpired: isExpired,
        remainingDays
      };
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Kullanıcının premium üyeliğe sahip olup olmadığını kontrol eder
   */
  static async isPremium(): Promise<boolean> {
    try {
      const { isPremium } = await this.getSubscriptionStatus();
      return isPremium;
    } catch (error) {
      this.logger.error("Premium kontrolü yapılırken hata oluştu", error);
      return false;
    }
  }

  /**
   * Kullanıcının deneme süresinin dolup dolmadığını kontrol eder
   */
  static async isTrialExpired(): Promise<boolean> {
    try {
      const { isTrialExpired } = await this.getSubscriptionStatus();
      return isTrialExpired;
    } catch (error) {
      this.logger.error("Deneme süresi kontrolü yapılırken hata oluştu", error);
      return true; // Hata durumunda deneme süresinin bittiğini varsay (güvenli yaklaşım)
    }
  }

  /**
   * Kullanıcının deneme süresinin bitimine kaç gün kaldığını hesaplar
   */
  static async getRemainingTrialDays(): Promise<number | null> {
    try {
      const { remainingDays } = await this.getSubscriptionStatus();
      return remainingDays;
    } catch (error) {
      this.logger.error("Kalan gün hesaplanırken hata oluştu", error);
      return null;
    }
  }
}
