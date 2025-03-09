
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../../hooks/useSubscription';
import { SubscriptionPaymentDialog } from '../../../components/PaymentDialog/StepAdapter';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { viewsLogger } from '../../../logging';
import { PlansSkeleton } from '../shared/components/LoadingSkeleton';
import { PlanCard } from './components/PlanCard';

export const SubscriptionPlansView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(SubscriptionPlanType.MONTHLY);
  
  useEffect(() => {
    viewsLogger.debug('Abonelik planları sayfası görüntülendi');
  }, []);
  
  const handlePlanSelect = (planType: SubscriptionPlanType) => {
    viewsLogger.debug('Plan seçildi', { planType, currentPlan: subscription?.plan });
    
    // Eğer zaten aynı plana sahipse işlem yapma
    if (subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive) {
      return;
    }
    
    setSelectedPlan(planType);
    setPaymentOpen(true);
  };
  
  // Buton disable durumunu belirle
  const isCurrentPlan = (planType: SubscriptionPlanType) => {
    return subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive;
  };
  
  if (isLoading) {
    return <PlansSkeleton />;
  }
  
  // Plan özellikleri
  const monthlyFeatures = [
    { name: t('Subscription:plans.features.allAccess') },
    { name: t('Subscription:plans.features.unlimitedAccounts') },
    { name: t('Subscription:plans.features.advancedAnalytics') }
  ];
  
  const yearlyFeatures = [
    { name: t('Subscription:plans.features.allAccess') },
    { name: t('Subscription:plans.features.unlimitedAccounts') },
    { name: t('Subscription:plans.features.advancedAnalytics') },
    { name: t('Subscription:plans.features.prioritySupport'), highlight: true }
  ];
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:plans.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Aylık Plan */}
        <PlanCard 
          planType={SubscriptionPlanType.MONTHLY}
          features={monthlyFeatures}
          isCurrentPlan={isCurrentPlan(SubscriptionPlanType.MONTHLY)}
          isTrial={subscription?.isTrial || false}
          onSelectPlan={handlePlanSelect}
        />
        
        {/* Yıllık Plan */}
        <PlanCard 
          planType={SubscriptionPlanType.YEARLY}
          features={yearlyFeatures}
          isCurrentPlan={isCurrentPlan(SubscriptionPlanType.YEARLY)}
          isTrial={subscription?.isTrial || false}
          discount={20}
          onSelectPlan={handlePlanSelect}
          variant="highlighted"
        />
      </div>
      
      <SubscriptionPaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen} 
        selectedPlan={selectedPlan} 
      />
    </div>
  );
};
