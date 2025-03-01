
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

// Başarı action tipleri
type SuccessAction = 'upgrade' | 'cancel' | 'renewal' | 'trial' | 'cancelled';

// i18n namespace
const t = (key: string, options?: object) => i18next.t(key, { ns: "subscription.notifications", ...options });

export const showSubscriptionToast = {
  // Başarı durumları için
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
        title = t("trialEnding.title"); // i18n kullanımı
        description = t("trialEnded.description"); // i18n kullanımı
        break;
      default:
        title = t("success.title", { defaultValue: "İşlem Başarılı" });
        description = "";
    }

    toast({
      title,
      description,
      variant: "default"
    });
  },

  // Hata durumları için
  error: (error?: Error) => {
    const errorMessage = error?.message || 
      i18next.t("general.description", { ns: "errors" });

    toast({
      title: i18next.t("general.title", { ns: "errors" }),
      description: errorMessage,
      variant: "destructive"
    });
  },

  // Premium bildirimleri için
  premium: () => {
    toast({
      title: t("success.upgrade"),
      description: t("premium.active"),
      variant: "default"
    });
  },

  // Bilgilendirme mesajları için
  info: (message: string) => {
    toast({
      title: t("info.title", { defaultValue: "Bilgi" }),
      description: message,
      variant: "default"
    });
  },

  // Uyarı mesajları için
  warning: (message: string) => {
    toast({
      title: t("warning.title", { defaultValue: "Uyarı" }),
      description: message,
      variant: "default"
    });
  }
};
