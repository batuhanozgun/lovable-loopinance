
import { useState } from 'react';
import { SubscriptionPlanType } from '../../../../types/ISubscription';
import { useSubscription } from '../../../../hooks/useSubscription';
import { viewsLogger } from '../../../../logging';

export const usePlanSelection = () => {
  const { subscription } = useSubscription();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(SubscriptionPlanType.MONTHLY);
  
  const handlePlanSelect = (planType: SubscriptionPlanType) => {
    viewsLogger.debug('Plan seçildi', { planType, currentPlan: subscription?.plan });
    
    // Eğer zaten aynı plana sahipse işlem yapma
    if (subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive) {
      return;
    }
    
    setSelectedPlan(planType);
    setPaymentOpen(true);
  };
  
  return {
    paymentOpen,
    setPaymentOpen,
    selectedPlan,
    handlePlanSelect
  };
};
