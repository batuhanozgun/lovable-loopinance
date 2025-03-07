
import { useSubscriptionState } from './state/useSubscriptionState';
import { useSubscriptionStatus } from './validation/useSubscriptionStatus';
import { useSubscriptionError } from './error/useSubscriptionError';

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
