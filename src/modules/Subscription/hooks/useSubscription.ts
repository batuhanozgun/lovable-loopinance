
import { useState, useEffect, useCallback } from 'react';
import { SubscriptionService } from '../services/SubscriptionService';
import { ISubscriptionSummary, SubscriptionPlanType } from '../types/ISubscription';
import { SessionService } from '@/modules/UserManagement/auth/services/SessionService';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { subscriptionLogger } from '../logging';

export const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionSummary, setSubscriptionSummary] = useState<ISubscriptionSummary | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation(['Subscription', 'common']);

  // Abonelik bilgilerini getir
  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Önce kullanıcı kimliğini al
      const sessionResponse = await SessionService.getCurrentSession();
      
      if (!sessionResponse.success || !sessionResponse.user) {
        setError(t('Subscription:errors.access.denied'));
        setIsLoading(false);
        return;
      }
      
      const userId = sessionResponse.user.id;
      const summary = await SubscriptionService.getSubscriptionSummary(userId);
      
      if (!summary) {
        setError(t('Subscription:errors.fetch.notFound'));
      } else {
        setSubscriptionSummary(summary);
      }
    } catch (error) {
      subscriptionLogger.error('Abonelik bilgisi yüklenirken hata oluştu', error);
      setError(t('Subscription:errors.fetch.general'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Abonelik planını güncelle
  const updateSubscriptionPlan = useCallback(async (planType: SubscriptionPlanType) => {
    try {
      const sessionResponse = await SessionService.getCurrentSession();
      
      if (!sessionResponse.success || !sessionResponse.user) {
        toast({
          title: t('common:error'),
          description: t('Subscription:errors.access.denied'),
          variant: "destructive",
        });
        return false;
      }
      
      const userId = sessionResponse.user.id;
      
      const response = await SubscriptionService.updateSubscriptionPlan(userId, planType);
      
      if (!response.success) {
        toast({
          title: t('common:error'),
          description: t('Subscription:errors.update.planChange'),
          variant: "destructive",
        });
        return false;
      }
      
      // Başarılı olursa abonelik bilgisini tekrar yükle
      await fetchSubscription();
      
      toast({
        title: t('common:success'),
        description: t('Subscription:subscription.plan.' + planType),
      });
      
      return true;
    } catch (error) {
      subscriptionLogger.error('Plan güncellenirken hata oluştu', error);
      toast({
        title: t('common:error'),
        description: t('Subscription:errors.update.general'),
        variant: "destructive",
      });
      return false;
    }
  }, [fetchSubscription, t, toast]);

  // İlk yüklemede abonelik bilgisini getir
  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);
  
  return {
    isLoading,
    error,
    subscription: subscriptionSummary,
    refreshSubscription: fetchSubscription,
    updatePlan: updateSubscriptionPlan
  };
};
