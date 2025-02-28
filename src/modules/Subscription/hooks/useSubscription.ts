
import { useState, useEffect } from "react";
import { SubscriptionService } from "../services/SubscriptionService";
import { ISubscription } from "../interfaces/ISubscription";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

type SubscriptionStatus = "loading" | "trial" | "premium" | "expired" | "error";

interface UseSubscriptionReturn {
  subscription: ISubscription | null;
  status: SubscriptionStatus;
  isLoading: boolean;
  isTrialExpired: boolean;
  isPremium: boolean;
  remainingDays: number | null;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [status, setStatus] = useState<SubscriptionStatus>("loading");
  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { t } = useTranslation(["subscription"]);

  const fetchSubscription = async () => {
    setIsLoading(true);
    try {
      // Abonelik bilgilerini getir
      const subscriptionData = await SubscriptionService.getCurrentSubscription();
      setSubscription(subscriptionData);

      // Premium durumunu kontrol et
      const premiumStatus = await SubscriptionService.isPremium();
      setIsPremium(premiumStatus);

      if (premiumStatus) {
        setStatus("premium");
        setIsTrialExpired(false);
        setRemainingDays(null);
      } else {
        // Trial durumunu kontrol et
        const trialExpired = await SubscriptionService.isTrialExpired();
        setIsTrialExpired(trialExpired);

        if (trialExpired) {
          setStatus("expired");
          setRemainingDays(0);
        } else {
          setStatus("trial");
          // Kalan gün sayısını getir
          const days = await SubscriptionService.getRemainingTrialDays();
          setRemainingDays(days);
          
          // Kalan gün sayısı 7 veya daha az ise uyarı bildirimi göster
          if (days <= 7 && days > 0) {
            toast({
              title: t("trialEnding.title", { ns: "subscription.notifications" }),
              description: days <= 3 
                ? t("trialEnding.days.3", { ns: "subscription.notifications" })
                : t("trialEnding.days.7", { ns: "subscription.notifications" }),
              variant: "default",
            });
          }
        }
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err : new Error("Bilinmeyen bir hata oluştu"));
      toast({
        title: t("errors:general.title", { ns: "errors" }),
        description: t("errors:general.description", { ns: "errors" }),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return {
    subscription,
    status,
    isLoading,
    isTrialExpired,
    isPremium,
    remainingDays,
    error,
    refetch: fetchSubscription
  };
};
