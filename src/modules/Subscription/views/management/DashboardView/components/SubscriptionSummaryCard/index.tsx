
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ISubscriptionSummary } from '../../../../../types/ISubscription';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { PriceDisplay } from '../../../shared/components/PriceDisplay';
import { RenewalDateDisplay } from '../../../shared/components/RenewalDateDisplay';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';

interface SubscriptionSummaryCardProps {
  subscription: ISubscriptionSummary | null;
}

export const SubscriptionSummaryCard: React.FC<SubscriptionSummaryCardProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription']);
  const { getPriceByPlan } = useSubscriptionPrice();
  
  if (!subscription) return null;
  
  const currentPrice = getPriceByPlan(subscription.plan);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{t('Subscription:dashboard.summary')}</h3>
            <CardDescription>
              {t(`Subscription:plan.${subscription.plan}`)}
            </CardDescription>
          </div>
          <StatusBadge subscription={subscription} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {subscription.daysRemaining > 0 ? (
              subscription.isTrial 
                ? t('Subscription:info.trialRemaining', { days: subscription.daysRemaining })
                : t('Subscription:info.subscriptionRemaining', { days: subscription.daysRemaining })
            ) : (
              subscription.isTrial 
                ? t('Subscription:info.trialExpired')
                : t('Subscription:info.expired')
            )}
          </div>
          
          {subscription.expiresAt && (
            <RenewalDateDisplay expiresAt={subscription.expiresAt} />
          )}
          
          <div className="flex items-center justify-between pt-2">
            <PriceDisplay 
              price={currentPrice} 
              planType={subscription.plan}
              className="font-medium"
            />
            
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
