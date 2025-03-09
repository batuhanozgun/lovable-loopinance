
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../../hooks/useSubscription';
import { viewsLogger } from '../../../logging';
import { SubscriptionSummaryCard } from './components/SubscriptionSummaryCard';
import { BillingInfoCard } from './components/BillingInfoCard';
import { UsageStatsCard } from './components/UsageStatsCard';
import { FeaturesAccessCard } from './components/FeaturesAccessCard';
import { DashboardSkeleton } from './components/DashboardSkeleton';

export const SubscriptionDashboardView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik yönetim paneli görüntülendi');
  }, []);
  
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <SubscriptionSummaryCard subscription={subscription} />
        <BillingInfoCard subscription={subscription} />
        <UsageStatsCard />
        <FeaturesAccessCard subscription={subscription} />
      </div>
    </div>
  );
};
