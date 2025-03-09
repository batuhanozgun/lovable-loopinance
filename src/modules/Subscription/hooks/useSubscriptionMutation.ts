
import { useCallback, useState } from 'react';
import { SubscriptionUpdateService } from '../services';
import { SubscriptionPlanType } from '../types/ISubscription';
import { useSessionUser } from './useSessionUser';
import { subscriptionLogger } from '../logging';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { IUpdateSubscriptionResponse } from '../types/ISubscriptionResponse';

/**
 * Abonelik planı değişiklikleri için hook
 */
export const useSubscriptionMutation = (onSuccess?: () => void) => {
  const { userId, refreshUserSession, isSessionLoading } = useSessionUser();
  const { toast } = useToast();
  const { t } = useTranslation(['Subscription', 'common']);
  const [isUpdating, setIsUpdating] = useState(false);

  // Abonelik planını güncelle
  const updateSubscriptionPlan = useCallback(async (
    planType: SubscriptionPlanType, 
    transactionId?: string
  ): Promise<IUpdateSubscriptionResponse> => {
    try {
      setIsUpdating(true);
      
      // Eğer oturum yükleniyor ise, yükleme tamamlanana kadar bekle
      if (isSessionLoading) {
        subscriptionLogger.debug('Oturum bilgisi yükleniyor, bekleniyor');
        // Kısa bir beklemeden sonra devam et
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      if (!userId) {
        // Oturumu yenilemeyi dene
        subscriptionLogger.debug('Kullanıcı ID bulunamadı, oturum yenileniyor');
        await refreshUserSession(true);
        
        // Hala userId yoksa hata ver
        if (!userId) {
          const errorMsg = t('Subscription:errors.update.missingUserId');
          subscriptionLogger.error('Kullanıcı ID bulunamadı', { 
            planType,
            sessionValid: !!userId 
          });
          
          return {
            success: false,
            error: errorMsg
          };
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
          planType,
          userId
        });
        
        return response;
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
      
      return response;
    } catch (error) {
      subscriptionLogger.error('Plan güncellenirken hata oluştu', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata',
        hasUserId: !!userId
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : t('Subscription:errors.update.general')
      };
    } finally {
      setIsUpdating(false);
    }
  }, [userId, refreshUserSession, toast, t, onSuccess, isSessionLoading]);

  return { 
    updatePlan: updateSubscriptionPlan, 
    isUpdating: isUpdating || isSessionLoading
  };
};
