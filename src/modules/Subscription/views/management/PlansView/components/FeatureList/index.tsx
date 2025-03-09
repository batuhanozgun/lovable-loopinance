
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';

interface FeatureListProps {
  planType: SubscriptionPlanType;
}

export const FeatureList: React.FC<FeatureListProps> = ({ planType }) => {
  const { t } = useTranslation(['Subscription']);
  const isYearly = planType === SubscriptionPlanType.YEARLY;
  
  return (
    <ul className="space-y-2 mb-6">
      <li className="flex items-start">
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
        <span>{t('Subscription:plans.features.allAccess')}</span>
      </li>
      <li className="flex items-start">
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
        <span>{t('Subscription:plans.features.unlimitedAccounts')}</span>
      </li>
      <li className="flex items-start">
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
        <span>{t('Subscription:plans.features.advancedAnalytics')}</span>
      </li>
      {isYearly && (
        <li className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          <span className="font-medium">{t('Subscription:plans.features.prioritySupport')}</span>
        </li>
      )}
    </ul>
  );
};
