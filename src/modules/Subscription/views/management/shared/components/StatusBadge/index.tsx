
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ISubscriptionSummary, SubscriptionStatus } from '../../../../../types/ISubscription';
import { useSubscriptionStatus } from '../../hooks/useSubscriptionStatus';

interface StatusBadgeProps {
  subscription: ISubscriptionSummary | null;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ subscription }) => {
  const { t } = useTranslation(['Subscription']);
  const { getStatusBadgeVariant } = useSubscriptionStatus(subscription);
  
  if (!subscription) return null;

  // Özel trial sonu mesajı
  const getStatusText = () => {
    if (subscription.status === SubscriptionStatus.TRIAL && subscription.daysRemaining <= 7) {
      return t('Subscription:badge.trialEnding');
    }
    return t(`Subscription:status.${subscription.status}`);
  };
  
  return (
    <Badge variant={getStatusBadgeVariant() as any}>
      {getStatusText()}
    </Badge>
  );
};
