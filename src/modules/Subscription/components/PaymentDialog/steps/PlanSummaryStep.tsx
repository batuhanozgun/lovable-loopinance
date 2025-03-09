
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PlanSummaryStepProps {
  selectedPlan: SubscriptionPlanType;
  onNext: () => void; // onContinue'dan onNext'e değiştirdik
}

export const PlanSummaryStep: React.FC<PlanSummaryStepProps> = ({ 
  selectedPlan, 
  onNext 
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  
  // Format currency
  const formatCurrency = (price: number, currency: string = '₺') => {
    return new Intl.NumberFormat(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: currency === '₺' ? 'TRY' : currency,
      minimumFractionDigits: 0,
    }).format(price).replace('TRY', '₺');
  };
  
  // Plan fiyatı
  const getPlanPrice = () => {
    if (selectedPlan === SubscriptionPlanType.MONTHLY) {
      return 49;
    } else if (selectedPlan === SubscriptionPlanType.YEARLY) {
      return 39 * 12; // Aylık 39, yıllık toplam
    }
    return 0;
  };
  
  // Seçilen plan özellikleri
  const getPlanFeatures = () => {
    const baseFeatures = [
      t('Subscription:plans.features.allAccess'),
      t('Subscription:plans.features.unlimitedAccounts'),
      t('Subscription:plans.features.advancedAnalytics'),
    ];
    
    if (selectedPlan === SubscriptionPlanType.YEARLY) {
      baseFeatures.push(t('Subscription:plans.features.prioritySupport'));
    }
    
    return baseFeatures;
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{t(`Subscription:plan.${selectedPlan}`)}</h3>
            <p className="text-2xl font-bold mt-2">
              {formatCurrency(getPlanPrice())}
              <span className="text-sm text-muted-foreground ml-1">
                {selectedPlan === SubscriptionPlanType.MONTHLY 
                  ? t('Subscription:plans.pricing.period.month') 
                  : t('Subscription:plans.pricing.period.year')}
              </span>
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{t('Subscription:payment.included')}:</h4>
            <ul className="space-y-2">
              {getPlanFeatures().map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-primary" /> 
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end pt-2">
        <Button onClick={onNext}>
          {t('Subscription:payment.actions.continue')}
        </Button>
      </div>
    </div>
  );
};
