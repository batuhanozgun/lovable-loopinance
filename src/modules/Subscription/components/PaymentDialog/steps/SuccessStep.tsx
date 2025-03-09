
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { CheckCircle2 } from 'lucide-react';

interface SuccessStepProps {
  selectedPlan: SubscriptionPlanType;
  onClose: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  selectedPlan,
  onClose
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-6">
      <div className="rounded-full bg-primary/10 p-3">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">
          {t('Subscription:payment.success.congratulations')}
        </h3>
        <p className="text-muted-foreground">
          {t('Subscription:payment.success.planActivated', { 
            plan: t(`Subscription:plan.${selectedPlan}`) 
          })}
        </p>
      </div>
      
      <div className="w-full max-w-xs">
        <Button className="w-full" onClick={onClose}>
          {t('Subscription:payment.actions.done')}
        </Button>
      </div>
    </div>
  );
};
