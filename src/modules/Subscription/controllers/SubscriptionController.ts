
import { SubscriptionService } from "../services/subscription/SubscriptionService";
import { SubscriptionStatusService } from "../services/subscription/SubscriptionStatusService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { SubscriptionStatus } from "../interfaces/subscription/ISubscription";

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
        toast({
          title: "Başarılı!",
          description: "Premium aboneliğe başarıyla geçiş yaptınız.",
          variant: "default",
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      this.logger.error("Premium aboneliğe geçiş başarısız oldu", error);
      
      toast({
        title: "Hata!",
        description: error instanceof Error 
          ? error.message 
          : "Premium aboneliğe geçiş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
      
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
      this.logger.debug("Abonelik durumu kontrol ediliyor");
      
      const { 
        isPremium, 
        isTrialExpired, 
        remainingDays 
      } = await SubscriptionStatusService.getSubscriptionStatus();
      
      // Premium hesap ise sorun yok
      if (isPremium) {
        this.logger.debug("Kullanıcı premium aboneliğe sahip");
        return { 
          status: "premium", 
          hasAccess: true
        };
      }
      
      // Trial süresi bitmiş ise kısıtlı erişim
      if (isTrialExpired) {
        this.logger.debug("Kullanıcının deneme süresi bitmiş");
        return { 
          status: "expired",
          hasAccess: false 
        };
      }
      
      // Trial süresi devam ediyor
      this.logger.debug("Kullanıcının deneme süresi devam ediyor", { remainingDays });
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
      const { subscription } = await SubscriptionStatusService.getSubscriptionStatus();
      
      if (!subscription) {
        return {
          features: [],
          hasAccess: false
        };
      }
      
      return {
        features: subscription.type === 'premium' || subscription.type === 'business' 
          ? ['premium', 'unlimited'] 
          : ['basic'],
        hasAccess: subscription.type !== 'trial' || !await SubscriptionStatusService.isTrialExpired()
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
