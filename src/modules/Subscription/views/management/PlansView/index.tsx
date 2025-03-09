
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../../hooks/useSubscription';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { viewsLogger } from '../../../logging';
import { PlansSkeleton } from '../shared/components/LoadingSkeleton';
import { PlanCard } from './components/PlanCard';
import { SubscriptionPaymentDialog } from '../../../components/PaymentDialog/StepAdapter';

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
  
  const isCurrentPlan = (planType: SubscriptionPlanType) => {
    return subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive;
  };

  // Plan özellikleri
  const getMonthlyFeatures = () => [
    { key: 'allAccess' },
    { key: 'unlimitedAccounts' },
    { key: 'advancedAnalytics' },
  ];
  
  const getYearlyFeatures = () => [
    { key: 'allAccess' },
    { key: 'unlimitedAccounts' },
    { key: 'advancedAnalytics' },
    { key: 'prioritySupport', highlight: true }
  ];
  
  if (isLoading) {
    return <PlansSkeleton />;
  }
  
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
          features={getMonthlyFeatures()}
          isCurrentPlan={isCurrentPlan(SubscriptionPlanType.MONTHLY)}
          onSelectPlan={handlePlanSelect}
        />
        
        {/* Yıllık Plan */}
        <PlanCard 
          planType={SubscriptionPlanType.YEARLY}
          features={getYearlyFeatures()}
          isCurrentPlan={isCurrentPlan(SubscriptionPlanType.YEARLY)}
          discountPercentage={20}
          onSelectPlan={handlePlanSelect}
          isYearly={true}
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
