
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { viewsLogger } from '../../../logging';
import { PlanCard } from './components/PlanCard';
import { SubscriptionPaymentDialog } from '../../../components/PaymentDialog/StepAdapter';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { usePlanSelection } from './hooks/usePlanSelection';

export const SubscriptionPlansView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { paymentOpen, selectedPlan, handlePlanSelect, setPaymentOpen } = usePlanSelection();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik planları sayfası görüntülendi');
  }, []);
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:plans.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <PlanCard 
          planType={SubscriptionPlanType.MONTHLY} 
          isHighlighted={false}
          onSelect={handlePlanSelect}
        />
        
        <PlanCard 
          planType={SubscriptionPlanType.YEARLY} 
          isHighlighted={true}
          onSelect={handlePlanSelect}
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
