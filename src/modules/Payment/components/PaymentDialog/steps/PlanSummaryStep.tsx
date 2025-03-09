
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { formatCurrency } from '../../../utils/currencyUtils';

interface PlanSummaryStepProps {
  planType: string;
  planPrice: number;
  planFeatures: string[];
  onNext: () => void;
}

export const PlanSummaryStep: React.FC<PlanSummaryStepProps> = ({ 
  planType, 
  planPrice,
  planFeatures,
  onNext 
}) => {
  const { t, i18n } = useTranslation(['Payment', 'common', 'Subscription']);
  const locale = i18n.language === 'tr' ? 'tr-TR' : 'en-US';
  const currency = i18n.language === 'tr' ? 'TRY' : 'USD';
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{t(`Subscription:plan.${planType}`)}</h3>
            <p className="text-2xl font-bold mt-2">
              {formatCurrency(planPrice, locale, currency)}
              <span className="text-sm text-muted-foreground ml-1">
                {planType === 'monthly'
                  ? t('Subscription:plans.pricing.period.month') 
                  : t('Subscription:plans.pricing.period.year')}
              </span>
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{t('Payment:included')}:</h4>
            <ul className="space-y-2">
              {planFeatures.map((feature, index) => (
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
          {t('Payment:actions.continue')}
        </Button>
      </div>
    </div>
  );
};
