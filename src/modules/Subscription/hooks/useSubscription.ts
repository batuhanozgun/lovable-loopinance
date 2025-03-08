
import { useCallback } from 'react';
import { useSubscriptionQuery } from './useSubscriptionQuery';
import { useSubscriptionMutation } from './useSubscriptionMutation';
import { useFeatureAccess } from './useFeatureAccess';
import { SubscriptionPlanType } from '../types/ISubscription';

/**
 * Abonelik işlemlerini birleştiren ana hook
 */
export const useSubscription = () => {
  const { 
    subscription, 
    isLoading, 
    error, 
    refreshSubscription 
  } = useSubscriptionQuery();
  
  const { updatePlan } = useSubscriptionMutation(refreshSubscription);
  const { isFeatureAccessible } = useFeatureAccess();

  return {
    isLoading,
    error,
    subscription,
    refreshSubscription,
    updatePlan,
    isFeatureAccessible
  };
};
