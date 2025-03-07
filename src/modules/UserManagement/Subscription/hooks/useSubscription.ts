
import { useSubscriptionState } from './state/useSubscriptionState';
import { useSubscriptionStatus } from './validation/useSubscriptionStatus';
import { useSubscriptionError } from './error/useSubscriptionError';
import { useEffect } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

const logger = LoggerService.getInstance("useSubscription");

/**
 * Ana abonelik hook'u - diğer hook'ları birleştirir
 */
export const useSubscription = () => {
  const { subscription, isLoading, error, daysRemaining } = useSubscriptionState();
  const { isActive, isExpired, isCancelled, isTrial } = useSubscriptionStatus(subscription);
  const { showErrorToast } = useSubscriptionError(error);
  
  // Abonelik durumunu logla
  useEffect(() => {
    if (subscription && !isLoading) {
      logger.debug("Abonelik durumu yüklendi", {
        status: subscription.status,
        daysRemaining,
        isActive,
        isExpired,
        isTrial
      });
    }
  }, [subscription, isLoading, daysRemaining, isActive, isExpired, isTrial]);
  
  // Hata varsa toast göster
  useEffect(() => {
    if (error) {
      showErrorToast();
    }
  }, [error, showErrorToast]);
  
  return {
    subscription,
    isLoading,
    error,
    daysRemaining,
    isActive,
    isExpired,
    isCancelled,
    isTrial
  };
};
