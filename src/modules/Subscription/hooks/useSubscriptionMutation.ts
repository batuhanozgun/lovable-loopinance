
import { useCallback, useState } from 'react';
import { SubscriptionUpdateService } from '../services';
import { SubscriptionPlanType } from '../types/ISubscription';
import { useSessionUser } from './useSessionUser';
import { subscriptionLogger } from '../logging';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Abonelik planı değişiklikleri için hook
 */
export const useSubscriptionMutation = (onSuccess?: () => void) => {
  const { userId, refreshUserSession } = useSessionUser();
  const { toast } = useToast();
  const { t } = useTranslation(['Subscription', 'common']);
  const [isUpdating, setIsUpdating] = useState(false);

  // Abonelik planını güncelle
  const updateSubscriptionPlan = useCallback(async (
    planType: SubscriptionPlanType, 
    transactionId?: string
  ) => {
    try {
      setIsUpdating(true);
      
      if (!userId) {
        // Oturumu yenilemeyi dene
        await refreshUserSession();
        
        // Hala userId yoksa hata ver
        if (!userId) {
          subscriptionLogger.error('Kullanıcı ID bulunamadı', { planType });
          toast({
            title: t('common:error'),
            description: t('Subscription:errors.access.denied'),
            variant: "destructive",
          });
          return false;
        }
      }
      
      subscriptionLogger.debug('Plan güncelleme başlatıldı', { 
        planType, 
        userId,
        transactionId: transactionId || 'yok' 
      });
      
      const response = await SubscriptionUpdateService.updateSubscriptionPlan(
        userId, 
        planType,
        transactionId
      );
      
      if (!response.success) {
        subscriptionLogger.error('Plan güncellenemedi', { 
          error: response.error, 
          planType 
        });
        toast({
          title: t('common:error'),
          description: t('Subscription:errors.update.planChange'),
          variant: "destructive",
        });
        return false;
      }
      
      subscriptionLogger.info('Plan başarıyla güncellendi', { 
        planType,
        userId
      });
      
      // Doğru plan adını çevirme
      const translatedPlan = t(`Subscription:plan.${planType}`);
      
      toast({
        title: t('common:success'),
        description: t('Subscription:subscription.plan.updated', { 
          plan: translatedPlan 
        }),
      });
      
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
    } finally {
      setIsUpdating(false);
    }
  }, [userId, refreshUserSession, toast, t, onSuccess]);

  return { 
    updatePlan: updateSubscriptionPlan, 
    isUpdating 
  };
};
