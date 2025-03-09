
import React from 'react';
import { useSubscriptionPrice } from '../../hooks/useSubscriptionPrice';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';
import { useTranslation } from 'react-i18next';

interface PriceDisplayProps {
  plan: SubscriptionPlanType;
  showPeriod?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  plan, 
  showPeriod = true,
  className = ''
}) => {
  const { getPriceByPlan, formatPrice } = useSubscriptionPrice();
  const { t } = useTranslation(['Subscription']);
  
  const price = getPriceByPlan(plan);
  const periodKey = plan === SubscriptionPlanType.YEARLY ? 'year' : 'month';
  
  return (
    <span className={className}>
      {formatPrice(price)}
      {showPeriod && (
        <span className="text-sm text-muted-foreground ml-1">
          {t(`Subscription:plans.pricing.period.${periodKey}`)}
        </span>
      )}
    </span>
  );
};
