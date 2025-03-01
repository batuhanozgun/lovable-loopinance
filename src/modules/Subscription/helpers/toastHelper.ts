
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

/**
 * Abonelik işlemleri için toast bildirimlerini yönetir
 */
export const showSubscriptionToast = {
  /**
   * Başarı bildirimleri
   * @param action - Başarı türü
   */
  success: (action: 'upgrade' | 'cancel' | 'renewal' | 'trial' | 'cancelled') => {
    let title = '';
    let description = '';

    switch (action) {
      case 'upgrade':
        title = i18next.t("Subscription.notifications.success.title");
        description = i18next.t("Subscription.notifications.success.upgraded", { plan: "Premium" });
        break;
      case 'cancel':
      case 'cancelled':
        title = i18next.t("Subscription.notifications.success.title");
        description = i18next.t("Subscription.notifications.success.cancelled");
        break;
      case 'renewal':
        title = i18next.t("Subscription.notifications.success.title");
        description = i18next.t("Subscription.notifications.success.subscribed", { plan: "Premium" });
        break;
      case 'trial':
        title = i18next.t("Subscription.notifications.trial.title");
        description = i18next.t("Subscription.notifications.trial.remaining", { days: 14 });
        break;
      default:
        title = i18next.t("Subscription.notifications.success.title", { defaultValue: "İşlem Başarılı" });
        description = "";
    }

    toast({
      title,
      description,
      variant: "default"
    });
  },

  /**
   * Hata bildirimleri
   * @param error - Hata objesi
   */
  error: (error?: Error) => {
    const errorMessage = error?.message || 
      i18next.t("Subscription.notifications.error.fallback");

    toast({
      title: i18next.t("Subscription.notifications.error.title"),
      description: errorMessage,
      variant: "destructive"
    });
  },

  /**
   * Premium bildirimleri
   */
  premium: () => {
    toast({
      title: i18next.t("Subscription.notifications.premium.title"),
      description: i18next.t("Subscription.notifications.premium.status"),
      variant: "default"
    });
  },

  /**
   * Bilgilendirme mesajları
   * @param message - Gösterilecek mesaj
   */
  info: (message: string) => {
    toast({
      title: i18next.t("info.title", { defaultValue: "Bilgi", ns: "subscription.notifications" }),
      description: message,
      variant: "default"
    });
  },

  /**
   * Uyarı mesajları
   * @param message - Gösterilecek mesaj
   */
  warning: (message: string) => {
    toast({
      title: i18next.t("warning.title", { defaultValue: "Uyarı", ns: "subscription.notifications" }),
      description: message,
      variant: "default"
    });
  },
  
  /**
   * Deneme süresi bildirimleri
   * @param remainingDays - Kalan gün sayısı
   */
  trialEnding: (remainingDays: number) => {
    let description = '';
    
    if (remainingDays <= 3) {
      description = i18next.t("trialEnding.days.3", { ns: "subscription.notifications" });
    } else if (remainingDays <= 7) {
      description = i18next.t("trialEnding.days.7", { ns: "subscription.notifications" });
    } else if (remainingDays <= 14) {
      description = i18next.t("trialEnding.days.14", { ns: "subscription.notifications" });
    } else {
      description = i18next.t("trial.remaining", { days: remainingDays, ns: "subscription.notifications" });
    }
    
    toast({
      title: i18next.t("trialEnding.title", { ns: "subscription.notifications" }),
      description,
      variant: "default"
    });
  }
};
