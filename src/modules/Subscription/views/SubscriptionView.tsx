
import React, { useEffect } from 'react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useTranslation } from 'react-i18next';
import { viewsLogger } from '../logging';

export const SubscriptionView: React.FC = () => {
  const { t } = useTranslation(['common', 'Subscription']);
  
  useEffect(() => {
    viewsLogger.debug('Abonelik sayfası görüntülendi');
  }, []);
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{t('Subscription:status.title', 'Abonelik Durumunuz')}</h1>
      
      <div className="grid gap-6">
        <SubscriptionCard />
        
        {/* İleriki aşamalarda plan seçimi komponenti eklenebilir */}
        {/* <PlanSelector /> */}
      </div>
    </div>
  );
};
