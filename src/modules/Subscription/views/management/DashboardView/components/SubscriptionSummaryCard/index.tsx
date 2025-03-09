
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ISubscriptionSummary, SubscriptionPlanType } from '@/modules/Subscription/types/ISubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { PriceDisplay } from '../../../shared/components/PriceDisplay';
import { RenewalDateDisplay } from '../../../shared/components/RenewalDateDisplay';
import { useSubscriptionStatus } from '../../../shared/hooks/useSubscriptionStatus';

interface SubscriptionSummaryCardProps {
  subscription: ISubscriptionSummary | null;
}

export const SubscriptionSummaryCard: React.FC<SubscriptionSummaryCardProps> = ({ 
  subscription 
}) => {
  const { t } = useTranslation(['Subscription']);
  const { getSubscriptionInfoText } = useSubscriptionStatus(subscription);
  
  if (!subscription) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{t('Subscription:dashboard.summary')}</CardTitle>
            <CardDescription>
              {subscription && t(`Subscription:plans.${subscription.plan}`)}
            </CardDescription>
          </div>
          <StatusBadge subscription={subscription} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {getSubscriptionInfoText()}
          </div>
          
          <RenewalDateDisplay subscription={subscription} />
          
          <div className="flex items-center justify-between pt-2">
            <PriceDisplay 
              plan={subscription.plan}
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
