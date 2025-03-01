
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
      title: <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        {title}
      </div>,
      description,
      variant: "default",
    });
  },

  error: (error?: Error) => {
    const errorMessage = error?.message || 
      i18next.t("general.description", { ns: "errors" });

    toast({
      title: <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-500" />
        {i18next.t("general.title", { ns: "errors" })}
      </div>,
      description: errorMessage,
      variant: "destructive",
    });
  },

  premium: () => {
    toast({
      title: <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        {t("success.upgrade")}
      </div>,
      description: t("premium.active"),
      variant: "default",
    });
  },

  info: (message: string) => {
    toast({
      title: <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-blue-500" />
        Bilgi
      </div>,
      description: message,
      variant: "default",
    });
  },

  warning: (message: string) => {
    toast({
      title: <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        Uyarı
      </div>,
      description: message,
      variant: "default",
    });
  }
};
