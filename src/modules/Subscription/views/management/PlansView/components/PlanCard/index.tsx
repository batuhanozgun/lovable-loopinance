
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';
import { useSubscription } from '../../../../../hooks/useSubscription';
import { FeatureList } from '../FeatureList';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';
import { formatPrice } from '../../../shared/utils/formatters';
import { getButtonText, isButtonDisabled } from '../../utils/planUtils';

interface PlanCardProps {
  planType: SubscriptionPlanType;
  isHighlighted: boolean;
  onSelect: (planType: SubscriptionPlanType) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  planType,
  isHighlighted,
  onSelect
}) => {
  const { t, i18n } = useTranslation(['Subscription']);
  const { subscription } = useSubscription();
  const { locale, currency } = useSubscriptionLocale();
  const { monthlyPrice, yearlyPrice, yearlyTotalPrice, yearlyDiscount } = useSubscriptionPrice();
  
  const isYearly = planType === SubscriptionPlanType.YEARLY;
  const price = isYearly ? yearlyPrice : monthlyPrice;
  
  return (
    <Card className={`border ${isHighlighted ? 'border-primary' : 'border-border'}`}>
      <CardHeader>
        {isHighlighted && (
          <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
            {t('Subscription:plans.discount', { percentage: yearlyDiscount })}
          </div>
        )}
        <CardTitle>{t(`Subscription:plan.${isYearly ? 'yearly' : 'monthly'}`)}</CardTitle>
        <CardDescription>
          {t(`Subscription:payment.plan.${isYearly ? 'yearly' : 'monthly'}.description`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">
            {formatPrice(price, locale, currency)}
            <span className="text-sm text-muted-foreground ml-1">
              {t('Subscription:plans.pricing.period.month')}
            </span>
          </p>
          
          {isYearly && (
            <>
              <p className="text-sm text-muted-foreground">
                {t('Subscription:plans.pricing.billedAnnually')}
              </p>
              <p className="text-sm font-medium text-primary mt-1">
                {i18n.language.startsWith('tr') ? 'Yıllık toplam: ' : 'Yearly total: '}
                {formatPrice(yearlyTotalPrice, locale, currency)}
              </p>
            </>
          )}
        </div>
        
        <FeatureList planType={planType} />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={isHighlighted ? "gradient" : "default"}
          onClick={() => onSelect(planType)}
          disabled={isButtonDisabled(planType, subscription)}
        >
          {getButtonText(planType, subscription, t)}
        </Button>
      </CardFooter>
    </Card>
  );
};
