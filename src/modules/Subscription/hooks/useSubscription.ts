
import { useState, useEffect } from "react";
import { SubscriptionService } from "../services/SubscriptionService";
import { ISubscription } from "../interfaces/ISubscription";

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
        }
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err : new Error("Bilinmeyen bir hata oluştu"));
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
