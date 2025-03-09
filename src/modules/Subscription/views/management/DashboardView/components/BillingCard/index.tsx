
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { ISubscriptionSummary, SubscriptionPlanType } from '@/modules/Subscription/types/ISubscription';
import { RenewalDateDisplay } from '../../../shared/components/RenewalDateDisplay';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';

interface BillingCardProps {
  subscription: ISubscriptionSummary | null;
}

export const BillingCard: React.FC<BillingCardProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription']);
  const { getSinglePaymentAmount, formatPrice, yearlyPrice, monthlyPrice } = useSubscriptionPrice();
  
  if (!subscription) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          {t('Subscription:dashboard.nextBilling')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subscription && subscription.expiresAt ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:plans.title')}:</span>
              <span className="font-medium">{t(`Subscription:plans.${subscription.plan}`)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:payment.confirmation.amount')}:</span>
              <span className="font-medium">
                {formatPrice(getSinglePaymentAmount(subscription.plan))}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:info.renewalDate', { date: '' })}:</span>
              <span className="font-medium">
                <RenewalDateDisplay 
                  subscription={subscription} 
                  showIcon={false}
                />
              </span>
            </div>
            
            <Button asChild size="sm" variant="outline" className="w-full mt-2">
              <Link to="/subscription/billing">
                {t('Subscription:actions.viewDetails')}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              {t('Subscription:billing.noInvoices')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
