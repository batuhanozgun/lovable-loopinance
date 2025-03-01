
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
    try {
      // Önce cache'den hızlı bir veri alıp UI'ı güncelleyelim
      const cachedSubscription = SubscriptionService.getSubscriptionCache();
      
      // Cache'de veri varsa hemen kullan
      if (cachedSubscription) {
        updateUIFromSubscription(cachedSubscription);
        
        // Eğer cache verisi çok yeni ise (30 saniyeden yeni), yeni veri çekmeyi atla
        const cacheAge = Date.now() - (SubscriptionService.subscriptionCache?.timestamp || 0);
        if (cacheAge < 30000) { // 30 saniye
          setIsLoading(false);
          return;
        }
      }
      
      // UI bloke olmadan arka planda gerçek veriyi getir
      setIsLoading(true);
      
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
      
      updateUIFromSubscription(subscriptionData);
      
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
  
  // Abonelik verilerine göre UI'ı güncelle
  const updateUIFromSubscription = (subscriptionData: ISubscription) => {
    setSubscription(subscriptionData);
    
    // Premium durumunu kontrol et
    const premiumStatus = subscriptionData.type === 'premium';
    setIsPremium(premiumStatus);
    
    // Trial süresinin dolup dolmadığını kontrol et
    let trialExpired = true;
    let days = null;
    
    if (subscriptionData.type === 'trial' && subscriptionData.trial_ends_at) {
      const trialEndsAt = new Date(subscriptionData.trial_ends_at);
      const now = new Date();
      
      trialExpired = now > trialEndsAt;
      
      if (!trialExpired) {
        // Milisaniyeden gün hesabı
        const remainingMilliseconds = trialEndsAt.getTime() - now.getTime();
        days = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
      } else {
        days = 0;
      }
    }
    
    setIsTrialExpired(trialExpired);
    setRemainingDays(days);
    
    // Status'u belirle
    if (premiumStatus) {
      setStatus("premium");
    } else if (trialExpired || subscriptionData.status === 'expired') {
      setStatus("expired");
    } else {
      setStatus("trial");
      
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
    const currentPlan = SubscriptionService.getSubscriptionPlanByType(
      subscriptionData.type,
      // Eğer plan_id varsa ve "-yearly" içeriyorsa yıllık plan
      subscriptionData.plan_id?.includes("-yearly") ? "yearly" : "monthly"
    );
    setPlan(currentPlan);
  };

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
