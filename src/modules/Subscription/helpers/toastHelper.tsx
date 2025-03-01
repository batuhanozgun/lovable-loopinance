
import React from "react";
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";
import { ToastActionElement } from "@/components/ui/toast";

// Trial süresi bitimine yaklaşan kullanıcılar için Action butonu bileşeni
const TrialActionButton: React.FC<{ onUpgrade: () => void, label: string }> = ({ 
  onUpgrade, 
  label 
}) => (
  <div className="mt-2">
    <button 
      onClick={() => {
        onUpgrade();
        // Yönlendirme işlemi
        window.location.href = "/subscription/manage";
      }} 
      className="px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
    >
      {label}
    </button>
  </div>
);

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
      title: i18next.t("Subscription.notifications.info.title", { defaultValue: "Bilgi" }),
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
      title: i18next.t("Subscription.notifications.warning.title", { defaultValue: "Uyarı" }),
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
    let title = i18next.t("Subscription.notifications.trial.title", { defaultValue: "Deneme Süresi" });
    let variant: "default" | "destructive" = "default";
    
    if (remainingDays <= 0) {
      description = i18next.t("Subscription.notifications.trial.ended", { defaultValue: "Deneme süreniz sona erdi." });
      title = i18next.t("Subscription.notifications.trialEnded.title", { defaultValue: "Deneme Süresi Sona Erdi" });
      variant = "destructive";
    } else if (remainingDays <= 3) {
      description = i18next.t("Subscription.notifications.trialEnding.days.3", { defaultValue: "Son 3 gün" });
      variant = "destructive";
    } else if (remainingDays <= 7) {
      description = i18next.t("Subscription.notifications.trialEnding.days.7", { defaultValue: "Son 1 hafta" });
      variant = "default";
    } else if (remainingDays <= 14) {
      description = i18next.t("Subscription.notifications.trialEnding.days.14", { defaultValue: "Deneme sürenizin bitmesine 2 hafta kaldı" });
      variant = "default";
    } else {
      description = i18next.t("Subscription.notifications.trial.remaining", { days: remainingDays, defaultValue: `Deneme sürenizin bitmesine ${remainingDays} gün kaldı.` });
      variant = "default";
    }
    
    // Action component'ini sadece belirli durumlarda göster
    let action: ToastActionElement | undefined = undefined;
    
    if (remainingDays <= 7) {
      action = (
        <TrialActionButton
          onUpgrade={() => console.log("Premium'a geçiliyor...")}
          label={i18next.t("Subscription.notifications.trialEnded.cta", { defaultValue: "Premium'a Geç" })}
        />
      );
    }
    
    toast({
      title,
      description,
      variant,
      action
    });
  },
  
  /**
   * Trial süresi bittiğinde bildirim
   */
  trialEnded: () => {
    const action = (
      <TrialActionButton
        onUpgrade={() => console.log("Premium'a geçiliyor...")}
        label={i18next.t("Subscription.notifications.trialEnded.cta", { defaultValue: "Premium'a Geç" })}
      />
    );
    
    toast({
      title: i18next.t("Subscription.notifications.trialEnded.title", { defaultValue: "Deneme Süreniz Sona Erdi" }),
      description: i18next.t("Subscription.notifications.trialEnded.description", { defaultValue: "Verileriniz korunuyor, dilediğiniz zaman kaldığınız yerden devam edebilirsiniz" }),
      variant: "destructive",
      action
    });
  }
};
