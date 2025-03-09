
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';
import { PriceDisplay } from '../../../shared/components/PriceDisplay';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';
import { useTranslation } from 'react-i18next';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';
import { formatPrice } from '../../../shared/utils/formatters';

interface PlanFeature {
  key: string;
  highlight?: boolean;
}

interface PlanCardProps {
  planType: SubscriptionPlanType;
  features: PlanFeature[];
  isCurrentPlan: boolean;
  discountPercentage?: number;
  onSelectPlan: (planType: SubscriptionPlanType) => void;
  isYearly?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  planType,
  features,
  isCurrentPlan,
  discountPercentage,
  onSelectPlan,
  isYearly = false
}) => {
  const { t } = useTranslation(['Subscription']);
  const { locale, currency } = useSubscriptionLocale();
  const { monthlyPrice, yearlyPrice, yearlyTotalPrice } = useSubscriptionPrice();
  
  const priceToShow = planType === SubscriptionPlanType.YEARLY ? yearlyPrice : monthlyPrice;
  const isPremium = planType === SubscriptionPlanType.YEARLY;
  
  const getButtonText = () => {
    if (isCurrentPlan) {
      return t('Subscription:subscription.plan.current', { plan: '' }).replace(':', '');
    }
    return t('Subscription:actions.changePlan');
  };
  
  return (
    <Card className={isPremium ? "border-primary" : "border-border"}>
      <CardHeader>
        {discountPercentage && isPremium && (
          <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
            {t('Subscription:plans.discount', { percentage: discountPercentage })}
          </div>
        )}
        <CardTitle>{t(`Subscription:plan.${planType}`)}</CardTitle>
        <CardDescription>
          {t(`Subscription:payment.plan.${planType}.description`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <PriceDisplay 
            price={priceToShow}
            planType={planType}
            className="text-3xl font-bold"
          />
          
          {isPremium && (
            <>
              <p className="text-sm text-muted-foreground">
                {t('Subscription:plans.pricing.billedAnnually')}
              </p>
              <p className="text-sm font-medium text-primary mt-1">
                {locale.startsWith('tr') ? 'Yıllık toplam: ' : 'Yearly total: '}
                {formatPrice(yearlyTotalPrice, locale, currency)}
              </p>
            </>
          )}
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className={feature.highlight ? "font-medium" : ""}>
                {t(`Subscription:plans.features.${feature.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={isPremium ? "gradient" : "default"}
          onClick={() => onSelectPlan(planType)}
          disabled={isCurrentPlan}
        >
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
};
