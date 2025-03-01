
import { SubscriptionService } from "../services/SubscriptionService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { showSubscriptionToast } from "../helpers/toastHelper";
import { SubscriptionStatus } from "../interfaces/ISubscription";

export class SubscriptionController {
  private static logger = LoggerService.getInstance("SubscriptionController");

  /**
   * Premium aboneliğe geçişi başlatır
   */
  static async handleUpgradeToPremium() {
    try {
      this.logger.debug("Premium aboneliğe geçiş başlatılıyor");
      
      const success = await SubscriptionService.upgradeToPremium();
      
      if (success) {
        showSubscriptionToast.premium();
        
        // Sayfayı yenile
        window.location.reload();
        
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      this.logger.error("Premium aboneliğe geçiş başarısız oldu", error);
      
      showSubscriptionToast.error(error instanceof Error ? error : undefined);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
      };
    }
  }

  /**
   * Kullanıcının deneme süresine göre hesap durumunu kontrol eder
   */
  static async checkSubscriptionStatus(): Promise<{
    status: SubscriptionStatus;
    hasAccess: boolean;
    remainingDays?: number | null;
    error?: string;
  }> {
    try {
      const { 
        isPremium, 
        isTrialExpired, 
        remainingDays 
      } = await SubscriptionService.getSubscriptionStatus();
      
      // Premium hesap ise sorun yok
      if (isPremium) {
        return { 
          status: "premium", 
          hasAccess: true
        };
      }
      
      // Trial süresi bitmiş ise kısıtlı erişim
      if (isTrialExpired) {
        return { 
          status: "expired",
          hasAccess: false 
        };
      }
      
      // Trial süresi devam ediyor
      return {
        status: "trial",
        hasAccess: true,
        remainingDays
      };
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken bir hata oluştu", error);
      
      // Hata durumunda erişime izin ver (daha sonra kontrol edilecek)
      return {
        status: "error",
        hasAccess: true,
        error: error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
      };
    }
  }

  /**
   * Kullanıcıya ait abonelik planı özelliklerini döndürür
   */
  static async getUserSubscriptionFeatures() {
    try {
      const { subscription } = await SubscriptionService.getSubscriptionStatus();
      
      if (!subscription) {
        return {
          features: [],
          hasAccess: false
        };
      }
      
      const plan = SubscriptionService.getSubscriptionPlanByType(subscription.type);
      
      return {
        features: plan?.features || [],
        hasAccess: subscription.type !== 'trial' || !await SubscriptionService.isTrialExpired()
      };
    } catch (error) {
      this.logger.error("Kullanıcı abonelik özellikleri alınırken hata oluştu", error);
      return {
        features: [],
        hasAccess: false,
        error: error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
      };
    }
  }
}
