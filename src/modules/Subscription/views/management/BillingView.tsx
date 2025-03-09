
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SubscriptionPlanType } from '../../types/ISubscription';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { Download, CreditCard, Plus } from 'lucide-react';
import { viewsLogger } from '../../logging';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Demo fatura verileri
const getDemoInvoices = (locale: string, currency: string) => {
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

export const SubscriptionBillingView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik fatura sayfası görüntülendi');
  }, []);
  
  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  
  // Demo fatura verileri
  const invoices = getDemoInvoices(locale, currency);
  
  // Ödeme yöntemi
  const paymentMethod = {
    type: 'card',
    lastFour: '4242',
    expiry: '12/25',
    brand: 'Visa'
  };
  
  // Tarih formatlama
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{i18n.language.startsWith('tr') ? 'Fatura No' : 'Invoice'}</TableHead>
                      <TableHead>{i18n.language.startsWith('tr') ? 'Tarih' : 'Date'}</TableHead>
                      <TableHead>{i18n.language.startsWith('tr') ? 'Plan' : 'Plan'}</TableHead>
                      <TableHead>{i18n.language.startsWith('tr') ? 'Tutar' : 'Amount'}</TableHead>
                      <TableHead>{i18n.language.startsWith('tr') ? 'İşlem' : 'Action'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>{t(`Subscription:plan.${invoice.plan}`)}</TableCell>
                        <TableCell>{formatCurrency(invoice.amount, locale, currency)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                    {i18n.language.startsWith('tr') 
                      ? 'Ödeme yöntemlerinizi yönetin' 
                      : 'Manage your payment methods'}
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('Subscription:billing.addPaymentMethod')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between border p-4 rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <p className="font-medium">
                        {paymentMethod.brand} •••• {paymentMethod.lastFour}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i18n.language.startsWith('tr') ? 'Son Kullanma: ' : 'Expires: '}
                        {paymentMethod.expiry}
                      </p>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {t('Subscription:billing.defaultPaymentMethod')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {i18n.language.startsWith('tr') ? 'Düzenle' : 'Edit'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Badge bileşeni
const Badge = ({ children, variant }: { children: React.ReactNode; variant?: string }) => {
  return (
    <span className={`bg-${variant === 'outline' ? 'transparent' : `${variant}-100`} text-${variant === 'outline' ? 'muted-foreground' : `${variant}-800`} border border-${variant === 'outline' ? 'border' : `${variant}-200`} px-2 py-0.5 rounded-full text-xs`}>
      {children}
    </span>
  );
};
