
import { useSubscriptionQuery } from './useSubscriptionQuery';
import { SubscriptionStatus } from '../types/ISubscription';
import { useMemo } from 'react';

export const useTrialStatus = () => {
  const { subscription, isLoading, error } = useSubscriptionQuery();
  
  // Deneme süresiyle ilgili bilgileri hesaplama
  const trialInfo = useMemo(() => {
    if (!subscription) {
      return {
        isTrial: false,
        daysRemaining: 0,
        isEnding: false,
        hasExpired: false
      };
    }
    
    const isTrial = subscription.isTrial;
    const daysRemaining = subscription.daysRemaining;
    const isEnding = isTrial && daysRemaining > 0 && daysRemaining <= 7; // Son 7 gün
    const hasExpired = isTrial && daysRemaining <= 0;
    
    return {
      isTrial,
      daysRemaining,
      isEnding,
      hasExpired,
      expiresAt: subscription.expiresAt
    };
  }, [subscription]);
  
  return {
    ...trialInfo,
    isLoading,
    error
  };
};
