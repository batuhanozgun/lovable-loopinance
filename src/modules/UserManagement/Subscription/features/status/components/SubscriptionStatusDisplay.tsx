
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PricingPlanType } from '@/modules/LandingPage/components/PricingSection/types/pricing.types';
import { SubscriptionStatus } from '../../../domain/models/Subscription';

interface SubscriptionStatusDisplayProps {
  status: SubscriptionStatus;
  planType: PricingPlanType;
}

export const SubscriptionStatusDisplay: React.FC<SubscriptionStatusDisplayProps> = ({ status, planType }) => {
  const getStatusBadge = () => {
    if (status === 'trial') return <Badge className="bg-blue-500">Deneme</Badge>;
    if (status === 'active' && planType === 'monthly') return <Badge className="bg-green-500">Aylık Abonelik</Badge>;
    if (status === 'active' && planType === 'yearly') return <Badge className="bg-green-700">Yıllık Abonelik</Badge>;
    if (status === 'expired') return <Badge variant="destructive">Süresi Dolmuş</Badge>;
    if (status === 'cancelled') return <Badge variant="secondary">İptal Edilmiş</Badge>;
    return <Badge variant="outline">Bilinmiyor</Badge>;
  };
  
  return getStatusBadge();
};
