
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { ISubscriptionSummary, SubscriptionPlanType } from '../../../../types/ISubscription';

interface FeaturesAccessCardProps {
  subscription: ISubscriptionSummary | null;
}

export const FeaturesAccessCard: React.FC<FeaturesAccessCardProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription']);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          {t('Subscription:dashboard.featuresAccess')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="h-5 w-5 text-green-500 mr-2">✓</span>
            <span>{t('Subscription:plans.features.allAccess')}</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-green-500 mr-2">✓</span>
            <span>{t('Subscription:plans.features.unlimitedAccounts')}</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-green-500 mr-2">✓</span>
            <span>{t('Subscription:plans.features.advancedAnalytics')}</span>
          </li>
          
          {subscription?.plan === SubscriptionPlanType.YEARLY && (
            <li className="flex items-start">
              <span className="h-5 w-5 text-green-500 mr-2">✓</span>
              <span>{t('Subscription:plans.features.prioritySupport')}</span>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};
