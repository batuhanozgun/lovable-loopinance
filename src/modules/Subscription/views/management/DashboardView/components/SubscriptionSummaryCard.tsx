
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ISubscriptionSummary, SubscriptionPlanType, SubscriptionStatus } from '../../../../types/ISubscription';
import { useSubscriptionStatus } from '../../shared/hooks/useSubscriptionStatus';
import { useSubscriptionPrice } from '../../shared/hooks/useSubscriptionPrice';
import { useSubscriptionLocale } from '../../shared/hooks/useSubscriptionLocale';
import { formatDate, formatPrice } from '../../shared/utils/formatters';

interface SubscriptionSummaryCardProps {
  subscription: ISubscriptionSummary | null;
}

export const SubscriptionSummaryCard: React.FC<SubscriptionSummaryCardProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { getStatusBadgeVariant } = useSubscriptionStatus(subscription);
  const { getPriceByPlan } = useSubscriptionPrice();
  const { locale, currency } = useSubscriptionLocale();

  if (!subscription) return null;

  const currentPrice = getPriceByPlan(subscription.plan);

  const getStatusText = () => {
    return t(`Subscription:status.${subscription.status}`);
  };
  
  const getSubscriptionInfoText = () => {
    if (subscription.status === SubscriptionStatus.TRIAL) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.trialRemaining', { days: subscription.daysRemaining })
        : t('Subscription:info.trialExpired');
    }
    
    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.subscriptionRemaining', { days: subscription.daysRemaining })
        : '';
    }
    
    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return t('Subscription:info.expired');
    }
    
    return '';
  };
  
  const getRenewalDate = () => {
    if (!subscription.expiresAt) return '';
    
    return formatDate(subscription.expiresAt, locale);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{t('Subscription:dashboard.summary')}</CardTitle>
            <CardDescription>
              {t(`Subscription:plans.${subscription.plan}`)}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant() as any}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {getSubscriptionInfoText()}
          </div>
          
          {subscription.expiresAt && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{t('Subscription:info.renewalDate', { date: getRenewalDate() })}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <div className="font-medium">
              {formatPrice(currentPrice, locale, currency)}
              <span className="text-sm text-muted-foreground ml-1">
                {t(`Subscription:plans.pricing.period.${subscription.plan === SubscriptionPlanType.YEARLY ? 'year' : 'month'}`)}
              </span>
            </div>
            
            <Button asChild size="sm">
              <Link to="/subscription/plans">
                {t('Subscription:actions.changePlan')}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
