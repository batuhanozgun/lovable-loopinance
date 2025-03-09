
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ISubscriptionSummary, SubscriptionPlanType } from '../../../../../types/ISubscription';
import { formatPrice } from '../../../shared/utils/formatters';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';
import { formatDate } from '../../../shared/utils/formatters';

interface BillingCardProps {
  subscription: ISubscriptionSummary | null;
}

export const BillingCard: React.FC<BillingCardProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription']);
  const { locale, currency } = useSubscriptionLocale();
  const { monthlyPrice, yearlyPrice } = useSubscriptionPrice();
  
  if (!subscription) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          {t('Subscription:dashboard.nextBilling')}
        </h3>
      </CardHeader>
      <CardContent>
        {subscription && subscription.expiresAt ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:plan.title')}:</span>
              <span className="font-medium">{t(`Subscription:plan.${subscription.plan}`)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:payment.confirmation.amount')}:</span>
              <span className="font-medium">
                {formatPrice(
                  subscription.plan === SubscriptionPlanType.YEARLY ? yearlyPrice * 12 : monthlyPrice,
                  locale,
                  currency
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('Subscription:info.renewalDate', { date: '' })}:</span>
              <span className="font-medium">{formatDate(subscription.expiresAt, locale)}</span>
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
