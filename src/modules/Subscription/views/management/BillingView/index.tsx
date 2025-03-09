
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoicesTab } from './components/InvoicesTab';
import { PaymentMethodsTab } from './components/PaymentMethodsTab';
import { viewsLogger } from '../../../logging';
import { useSubscription } from '../../../hooks/useSubscription';

export const SubscriptionBillingView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { isLoading } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik fatura sayfası görüntülendi');
  }, []);
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:billing.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">{t('Subscription:billing.invoices')}</TabsTrigger>
          <TabsTrigger value="payment-methods">{t('Subscription:billing.paymentMethods')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="mt-4">
          <InvoicesTab />
        </TabsContent>
        
        <TabsContent value="payment-methods" className="mt-4">
          <PaymentMethodsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
