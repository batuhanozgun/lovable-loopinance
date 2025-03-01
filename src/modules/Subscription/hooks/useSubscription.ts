
import { useState, useEffect, useCallback } from "react";
import { SubscriptionService } from "../services/SubscriptionService";
import { ISubscription, SubscriptionPlan, SubscriptionReturnType, SubscriptionStatus } from "../interfaces/ISubscription";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const useSubscription = (): SubscriptionReturnType => {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [status, setStatus] = useState<SubscriptionStatus>("loading");
  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation(["subscription.notifications", "errors"]);

  const fetchSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      // Tüm abonelik verilerini tek seferde getir
      const { 
        subscription: subscriptionData, 
        isPremium: premiumStatus, 
        isTrialExpired: trialExpired, 
        remainingDays: days 
      } = await SubscriptionService.getSubscriptionStatus();
      
      // Oturum yoksa (kullanıcı giriş yapmamışsa)
      if (subscriptionData === null) {
        setStatus("unauthenticated");
        setIsLoading(false);
        return;
      }
      
      setSubscription(subscriptionData);
      setIsPremium(premiumStatus);
      setIsTrialExpired(trialExpired);

      // Status'u belirle
      if (premiumStatus) {
        setStatus(subscriptionData.type as SubscriptionStatus);
        setRemainingDays(null);
      } else if (trialExpired || subscriptionData.status === 'expired') {
        setStatus("expired");
        setRemainingDays(0);
      } else {
        setStatus("trial");
        setRemainingDays(days);
        
        // Kalan gün sayısı 7 veya daha az ise uyarı bildirimi göster
        if (days !== null && days <= 7 && days > 0) {
          toast({
            title: t("trialEnding.title"),
            description: days <= 3 
              ? t("trialEnding.days.3")
              : t("trialEnding.days.7"),
            variant: "default",
          });
        }
      }

      // Abonelik planını belirle
      if (subscriptionData) {
        const currentPlan = SubscriptionService.getSubscriptionPlanByType(
          subscriptionData.type,
          // Eğer plan_id varsa ve "-yearly" içeriyorsa yıllık plan
          subscriptionData.plan_id?.includes("-yearly") ? "yearly" : "monthly"
        );
        setPlan(currentPlan);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err : new Error("Bilinmeyen bir hata oluştu"));
      console.error("Subscription error:", err);
      toast({
        title: t("general.title", { ns: "errors" }),
        description: t("general.description", { ns: "errors" }),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    status,
    plan,
    isLoading,
    isTrialExpired,
    isPremium,
    remainingDays,
    error,
    refetch: fetchSubscription
  };
};
