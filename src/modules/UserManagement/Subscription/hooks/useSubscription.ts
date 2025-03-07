
import { useSubscriptionState } from './useSubscriptionState';
import { useSubscriptionStatus } from './useSubscriptionStatus';
import { useSubscriptionError } from './useSubscriptionError';

/**
 * Ana abonelik hook'u - diğer hook'ları birleştirir
 */
export const useSubscription = () => {
  const { subscription, isLoading, error, daysRemaining } = useSubscriptionState();
  const { isActive, isExpired, isCancelled, isTrial } = useSubscriptionStatus(subscription);
  const { showErrorToast } = useSubscriptionError(error);
  
  // Hata varsa toast göster
  if (error) {
    showErrorToast();
  }
  
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
