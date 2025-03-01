
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

type SuccessAction = 'upgrade' | 'cancel' | 'renewal' | 'trial' | 'cancelled';

const t = (key: string, options?: object) => i18next.t(key, { ns: "subscription.notifications", ...options });

export const showSubscriptionToast = {
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
        title = "Deneme Süreniz Başladı";
        description = "3 aylık deneme süresi boyunca tüm özellikleri kullanabilirsiniz";
        break;
      default:
        title = "İşlem Başarılı";
        description = "";
    }

    toast({
      title,
      description,
      variant: "default",
      icon: CheckCircle
    });
  },

  error: (error?: Error) => {
    const errorMessage = error?.message || 
      i18next.t("general.description", { ns: "errors" });

    toast({
      title: i18next.t("general.title", { ns: "errors" }),
      description: errorMessage,
      variant: "destructive",
      icon: AlertCircle
    });
  },

  premium: () => {
    toast({
      title: t("success.upgrade"),
      description: t("premium.active"),
      variant: "default",
      icon: CheckCircle
    });
  },

  info: (message: string) => {
    toast({
      title: "Bilgi",
      description: message,
      variant: "default",
      icon: Info
    });
  },

  warning: (message: string) => {
    toast({
      title: "Uyarı",
      description: message,
      variant: "default",
      icon: AlertCircle
    });
  }
};
