
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';
import { formatPrice } from '../../utils/formatters';
import { useSubscriptionLocale } from '../../hooks/useSubscriptionLocale';

interface PriceDisplayProps {
  price: number;
  planType: SubscriptionPlanType;
  showPeriod?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  planType,
  showPeriod = true,
  className = ""
}) => {
  const { t } = useTranslation(['Subscription']);
  const { locale, currency } = useSubscriptionLocale();
  
  const formattedPrice = formatPrice(price, locale, currency);
  
  return (
    <span className={className}>
      {formattedPrice}
      {showPeriod && (
        <span className="text-sm text-muted-foreground ml-1">
          {t(`Subscription:plans.pricing.period.${planType === SubscriptionPlanType.YEARLY ? 'year' : 'month'}`)}
        </span>
      )}
    </span>
  );
};
