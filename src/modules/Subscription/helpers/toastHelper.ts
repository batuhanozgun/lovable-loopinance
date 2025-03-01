
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

/**
 * Toast bildirimi türleri
 */
type SuccessAction = 'upgrade' | 'cancel' | 'renewal' | 'trial' | 'cancelled';

/**
 * i18n namespace kısaltması
 */
const t = (key: string, options?: object) => i18next.t(key, { ns: "subscription.notifications", ...options });

/**
 * Abonelik toast bildirimlerini yönetir
 */
export const showSubscriptionToast = {
  // Başarı durumları için bildirimleri gösterir
  success: (action: SuccessAction) => {
    let title = '';
    let description = '';

    switch (action) {
      case 'upgrade':
        title = t("success.upgrade");
        description = t("premium.active");
        break;
      case 'cancel':
      case 'cancelled':
        title = t("success.cancel");
        description = "";
        break;
      case 'renewal':
        title = t("success.renewal");
        description = "";
        break;
      case 'trial':
        title = t("trialEnding.title");
        description = t("trialEnded.description");
        break;
      default:
        title = t("success.title", { defaultValue: "İşlem Başarılı" });
        description = "";
    }

    toast({
      title,
      description,
      variant: "default",
      // Icon isteğe bağlı
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  },

  // Hata durumları için bildirimleri gösterir
  error: (error?: Error) => {
    const errorMessage = error?.message || 
      i18next.t("general.description", { ns: "errors" });

    toast({
      title: i18next.t("general.title", { ns: "errors" }),
      description: errorMessage,
      variant: "destructive",
      // Icon isteğe bağlı
      icon: <AlertCircle className="h-4 w-4" />
    });
  },

  // Premium bildirimleri için özel toast
  premium: () => {
    toast({
      title: t("success.upgrade"),
      description: t("premium.active"),
      variant: "default",
      // Icon isteğe bağlı
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  },

  // Bilgilendirme mesajları için
  info: (message: string) => {
    toast({
      title: t("info.title", { defaultValue: "Bilgi" }),
      description: message,
      variant: "default",
      // Icon isteğe bağlı
      icon: <Info className="h-4 w-4 text-blue-500" />
    });
  },

  // Uyarı mesajları için
  warning: (message: string) => {
    toast({
      title: t("warning.title", { defaultValue: "Uyarı" }),
      description: message,
      variant: "default",
      // Icon isteğe bağlı
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />
    });
  },
  
  // Deneme süresi bildirimleri için
  trialEnding: (remainingDays: number) => {
    let description = '';
    
    if (remainingDays <= 3) {
      description = t("trialEnding.days.3");
    } else if (remainingDays <= 7) {
      description = t("trialEnding.days.7");
    } else if (remainingDays <= 14) {
      description = t("trialEnding.days.14");
    } else {
      description = t("trial.remaining", { days: remainingDays });
    }
    
    toast({
      title: t("trialEnding.title"),
      description,
      variant: "default",
      // Icon isteğe bağlı
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />
    });
  }
};
