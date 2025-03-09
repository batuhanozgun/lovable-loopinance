
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface PaymentMethod {
  type: string;
  lastFour: string;
  expiry: string;
  brand: string;
  isDefault?: boolean;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onAddMethod?: () => void;
  onEditMethod?: (method: PaymentMethod) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethods, 
  onAddMethod,
  onEditMethod
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const isTurkish = i18n.language.startsWith('tr');
  
  const handleAddMethod = () => {
    if (onAddMethod) onAddMethod();
  };
  
  const handleEditMethod = (method: PaymentMethod) => {
    if (onEditMethod) onEditMethod(method);
  };
  
  return (
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
                {isTurkish ? 'Son Kullanma: ' : 'Expires: '}
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
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEditMethod(method)}
          >
            {isTurkish ? 'Düzenle' : 'Edit'}
          </Button>
        </div>
      ))}
      
      <Button 
        size="sm" 
        className="mt-4" 
        onClick={handleAddMethod}
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('Subscription:billing.addPaymentMethod')}
      </Button>
    </div>
  );
};
