
import { useCallback } from 'react';
import { SubscriptionService } from '../services/SubscriptionService';
import { SubscriptionPlanType } from '../types/ISubscription';
import { useSessionUser } from './useSessionUser';
import { subscriptionLogger } from '../logging';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Abonelik planı değişiklikleri için hook
 */
export const useSubscriptionMutation = (onSuccess?: () => void) => {
  const { userId } = useSessionUser();
  const { toast } = useToast();
  const { t } = useTranslation(['Subscription', 'common']);

  // Abonelik planını güncelle
  const updateSubscriptionPlan = useCallback(async (planType: SubscriptionPlanType) => {
    try {
      if (!userId) {
        toast({
          title: t('common:error'),
          description: t('Subscription:errors.access.denied'),
          variant: "destructive",
        });
        return false;
      }
      
      const response = await SubscriptionService.updateSubscriptionPlan(userId, planType);
      
      if (!response.success) {
        toast({
          title: t('common:error'),
          description: t('Subscription:errors.update.planChange'),
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: t('common:success'),
        description: t('Subscription:subscription.plan.' + planType),
      });
      
      // Başarılı olursa callback çağır
      if (onSuccess) {
        onSuccess();
      }
      
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
  }, [userId, toast, t, onSuccess]);

  return { updatePlan: updateSubscriptionPlan };
};
