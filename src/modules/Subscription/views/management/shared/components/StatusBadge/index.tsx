
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ISubscriptionSummary } from '../../../../../types/ISubscription';
import { useSubscriptionStatus } from '../../hooks/useSubscriptionStatus';

interface StatusBadgeProps {
  subscription: ISubscriptionSummary | null;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ subscription }) => {
  const { getStatusBadgeVariant, getStatusText } = useSubscriptionStatus(subscription);
  
  if (!subscription) return null;
  
  return (
    <Badge variant={getStatusBadgeVariant() as any}>
      {getStatusText()}
    </Badge>
  );
};
