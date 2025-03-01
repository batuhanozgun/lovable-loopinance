
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export const showSubscriptionToast = {
  success: (type: 'subscribed' | 'cancelled' | 'upgraded' | 'downgraded', plan?: string) => toast({
    title: i18next.t("Subscription.notifications.success.title"),
    description: i18next.t(`Subscription.notifications.success.${type}`, { plan }),
  }),
  
  error: (error?: Error) => toast({
    variant: "destructive",
    title: i18next.t("Subscription.notifications.error.title"),
    description: error?.message || i18next.t("Subscription.notifications.error.fallback"),
  }),
  
  paymentFailed: () => toast({
    variant: "destructive",
    title: i18next.t("Subscription.notifications.error.title"),
    description: i18next.t("Subscription.notifications.error.paymentFailed"),
  }),
  
  premium: () => toast({
    title: i18next.t("Subscription.notifications.premium.title"),
    description: i18next.t("Subscription.notifications.premium.unlimited"),
  }),
  
  trialStatus: (days: number) => toast({
    title: i18next.t("Subscription.notifications.trial.title"),
    description: i18next.t("Subscription.notifications.trial.remaining", { days }),
  }),
};
