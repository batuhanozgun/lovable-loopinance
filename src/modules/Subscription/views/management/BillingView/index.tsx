
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSubscription } from '../../../hooks/useSubscription';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { viewsLogger } from '../../../logging';
import { BillingSkeleton } from '../shared/components/LoadingSkeleton';
import { Invoice, InvoiceTable } from './components/InvoiceTable';
import { PaymentMethod, PaymentMethods } from './components/PaymentMethods';
import { useSubscriptionLocale } from '../shared/hooks/useSubscriptionLocale';

export const SubscriptionBillingView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  const { locale, currency } = useSubscriptionLocale();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik fatura sayfası görüntülendi');
  }, []);

  // Demo fatura verileri oluştur
  const getDemoInvoices = (): Invoice[] => {
    const monthlyPrice = locale.startsWith('tr') ? 49 : 4.99;
    const yearlyPrice = locale.startsWith('tr') ? 468 : 59.88;
    
    return [
      {
        id: 'INV-001',
        date: new Date(2023, 11, 1),
        amount: yearlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.YEARLY
      },
      {
        id: 'INV-002',
        date: new Date(2022, 11, 1),
        amount: yearlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.YEARLY
      },
      {
        id: 'INV-003',
        date: new Date(2021, 11, 1),
        amount: monthlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.MONTHLY
      }
    ];
  };
  
  // Ödeme yöntemi
  const getPaymentMethods = (): PaymentMethod[] => {
    return [
      {
        type: 'card',
        lastFour: '4242',
        expiry: '12/25',
        brand: 'Visa',
        isDefault: true
      }
    ];
  };
  
  if (isLoading) {
    return <BillingSkeleton />;
  }
  
  const invoices = getDemoInvoices();
  const paymentMethods = getPaymentMethods();
  
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
          <Card>
            <CardHeader>
              <CardTitle>{t('Subscription:billing.history')}</CardTitle>
              <CardDescription>{t('Subscription:billing.invoices')}</CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <InvoiceTable invoices={invoices} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('Subscription:billing.noInvoices')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-methods" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{t('Subscription:billing.paymentMethods')}</CardTitle>
                  <CardDescription>
                    {locale.startsWith('tr') 
                      ? 'Ödeme yöntemlerinizi yönetin' 
                      : 'Manage your payment methods'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PaymentMethods paymentMethods={paymentMethods} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
