
import { useState, useEffect } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SessionService } from '@/modules/UserManagement/auth';
import { SubscriptionService } from '../services/SubscriptionService';
import { ISubscription } from '../types/ISubscription';

const logger = LoggerService.getInstance("useSubscriptionState");

/**
 * Abonelik durumu için temel state yönetim hook'u
 */
export const useSubscriptionState = () => {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        setIsLoading(true);
        
        // Mevcut kullanıcıyı al
        const currentUser = await SessionService.getCurrentUser();
        
        if (!currentUser) {
          setError('Kullanıcı bilgisi bulunamadı');
          return;
        }
        
        // Kullanıcının abonelik durumunu kontrol et
        const response = await SubscriptionService.checkSubscriptionStatus(currentUser.id);
        
        if (!response.success) {
          setError(response.error || 'Abonelik bilgileri alınamadı');
          return;
        }
        
        setSubscription(response.subscription || null);
        setDaysRemaining(response.daysRemaining || 0);
        setError(null);

        logger.debug("Abonelik durumu yüklendi", {
          status: response.subscription?.status,
          daysRemaining: response.daysRemaining
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Abonelik bilgileri yüklenirken bir hata oluştu';
        logger.error("Abonelik bilgileri yüklenirken hata", { error: errorMessage });
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  return {
    subscription,
    daysRemaining,
    isLoading,
    error,
    setError
  };
};
