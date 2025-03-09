
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus } from 'lucide-react';
import { getPaymentMethods } from '../../utils/billingUtils';

export const PaymentMethodsTab: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  
  // Örnek ödeme yöntemi
  const paymentMethods = getPaymentMethods();
  
  return (
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
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-start justify-between border p-4 rounded-md">
              <div className="flex items-center">
                <CreditCard className="h-10 w-10 mr-4 text-primary" />
                <div>
                  <p className="font-medium">
                    {method.brand} •••• {method.lastFour}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i18n.language.startsWith('tr') ? 'Son Kullanma: ' : 'Expires: '}
                    {method.expiry}
                  </p>
                  {method.isDefault && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs">
                        {t('Subscription:billing.defaultPaymentMethod')}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {i18n.language.startsWith('tr') ? 'Düzenle' : 'Edit'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
