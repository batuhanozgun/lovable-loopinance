
import { useMemo } from 'react';
import { ISubscription } from '../../domain/models/Subscription';

/**
 * Abonelik durum hesaplama hook'u
 */
export const useSubscriptionStatus = (subscription: ISubscription | null) => {
  return useMemo(() => {
    if (!subscription) {
      return {
        isActive: false,
        isExpired: false,
        isCancelled: false,
        isTrial: false
      };
    }
    
    const isActive = subscription.status === 'active' || subscription.status === 'trial';
    const isExpired = subscription.status === 'expired';
    const isCancelled = subscription.status === 'cancelled';
    const isTrial = subscription.status === 'trial';
    
    return {
      isActive,
      isExpired,
      isCancelled,
      isTrial
    };
  }, [subscription]);
};
